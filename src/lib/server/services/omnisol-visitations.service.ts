// omnisol-visitations.service.ts

import { sql } from 'drizzle-orm';
import { omnisolPatients, omnisolVisitations } from '../db/schema';
import { resolveRange, toIso, type DateRangeInput } from '$lib/shared/utils/dateRangeManagement';
import { db } from '../db';

// -----------------------------
// Types
// -----------------------------

export interface VisitationsSummary {
	range: { start: Date; end: Date; label: string };
	totalVisitations: number;
	withPayment: number; // visitations linked to a paymentId
	withoutPayment: number; // visitations with NULL paymentId
	conversionToPaidRate: number; // 0..1
}

export interface GroupCount {
	key: string;
	count: number;
}

export interface DailyCount {
	day: string; // YYYY-MM-DD
	count: number;
}

export interface VisitationsDashboard {
	summary: VisitationsSummary;
	byVisitType: GroupCount[];
	byDoctor: GroupCount[];
	dailySeries: DailyCount[];
	demographics: VisitationsDemographics;
}

export interface RatioRow {
	key: string;
	count: number;
	sharePct: number;
}

export interface VisitationsDemographics {
	range: { start: Date; end: Date; label: string };
	totals: {
		visits: number; // total visit records in range
		uniquePatients: number; // DISTINCT patients seen in range
	};
	gender: RatioRow[]; // Female/Male/Other/Unknown
	ageBuckets: RatioRow[]; // 0–12, 13–17, 18–39, 40–64, 65+
	statusMix: RatioRow[]; // New / Returning (from patients.patientStatus)
	categoryMix: RatioRow[]; // Medical Aid / Private / etc. (from patients.category)
	contactability: {
		withEmail: number; // visits with a patient that has an email
		withPhone: number; // visits with a patient that has a phone
	};
}

// -----------------------------
// Core queries (filter by visitations.timestamp)
// -----------------------------
const whereVisitationsInRange = (startISO: string, endISO: string) => sql`
  ${omnisolVisitations.timestamp}::timestamptz
  BETWEEN ${startISO}::timestamptz AND ${endISO}::timestamptz
`;

// Summary
export async function getVisitationsSummary(
	rangeInput: DateRangeInput
): Promise<VisitationsSummary> {
	const range = resolveRange(rangeInput);
	const sISO = toIso(range.start);
	const eISO = toIso(range.end);

	const q = await db.execute<{
		total: number;
		with_payment: number;
		without_payment: number;
	}>(sql`
    SELECT
      count(*)::int AS total,
      count(*) FILTER (WHERE ${omnisolVisitations.paymentId} IS NOT NULL)::int AS with_payment,
      count(*) FILTER (WHERE ${omnisolVisitations.paymentId} IS NULL)::int AS without_payment
    FROM ${omnisolVisitations}
    WHERE ${whereVisitationsInRange(sISO, eISO)}
  `);

	const r = q[0] ?? { total: 0, with_payment: 0, without_payment: 0 };
	const conversion = r.total ? r.with_payment / r.total : 0;

	return {
		range,
		totalVisitations: r.total,
		withPayment: r.with_payment,
		withoutPayment: r.without_payment,
		conversionToPaidRate: conversion
	};
}

// Groupings
export async function getVisitationsByVisitType(rangeInput: DateRangeInput): Promise<GroupCount[]> {
	const { start, end } = resolveRange(rangeInput);
	const sISO = toIso(start),
		eISO = toIso(end);

	const rows = await db.execute<{ key: string; count: number }>(sql`
    SELECT coalesce(nullif(trim(${omnisolVisitations.visitType}), ''), 'Unknown') AS key,
           count(*)::int AS count
    FROM ${omnisolVisitations}
    WHERE ${whereVisitationsInRange(sISO, eISO)}
    GROUP BY 1 ORDER BY 2 DESC
  `);
	return rows;
}

export async function getVisitationsByDoctor(rangeInput: DateRangeInput): Promise<GroupCount[]> {
	const { start, end } = resolveRange(rangeInput);
	const sISO = toIso(start),
		eISO = toIso(end);

	const rows = await db.execute<{ key: string; count: number }>(sql`
    SELECT coalesce(nullif(trim(${omnisolVisitations.doctor}), ''), 'Unassigned') AS key,
           count(*)::int AS count
    FROM ${omnisolVisitations}
    WHERE ${whereVisitationsInRange(sISO, eISO)}
    GROUP BY 1 ORDER BY 2 DESC
  `);
	return rows;
}

// Daily series
export async function getVisitationsDailySeries(rangeInput: DateRangeInput): Promise<DailyCount[]> {
	const { start, end } = resolveRange(rangeInput);
	const sISO = toIso(start),
		eISO = toIso(end);

	const rows = await db.execute<{ day: string; count: number }>(sql`
    SELECT to_char(date_trunc('day', ${omnisolVisitations.timestamp}::timestamptz), 'YYYY-MM-DD') AS day,
           count(*)::int AS count
    FROM ${omnisolVisitations}
    WHERE ${whereVisitationsInRange(sISO, eISO)}
    GROUP BY 1 ORDER BY 1 ASC
  `);
	return rows;
}

// Demographics
export async function getVisitationsDemographics(
	rangeInput: DateRangeInput
): Promise<VisitationsDemographics> {
	const range = resolveRange(rangeInput);
	const sISO = toIso(range.start);
	const eISO = toIso(range.end);

	// ---------- A) One-shot headline counters (fast) ----------
	// Uses visit rows in range joined to patients
	const head = await db.execute<{
		visits: number;
		unique_patients: number;
		female: number;
		male: number;
		other: number;
		unknown_gender: number;
		new_patients: number;
		returning_patients: number;
		with_email: number;
		with_phone: number;
		age_0_12: number;
		age_13_17: number;
		age_18_39: number;
		age_40_64: number;
		age_65p: number;
	}>(sql`
    SELECT
      count(*)::int AS visits,
      count(DISTINCT ${omnisolPatients.patientId})::int AS unique_patients,

      -- gender buckets
      count(*) FILTER (WHERE ${omnisolPatients.gender} = 'Female')::int AS female,
      count(*) FILTER (WHERE ${omnisolPatients.gender} = 'Male')::int   AS male,
      count(*) FILTER (WHERE ${omnisolPatients.gender} NOT IN ('Female','Male') AND ${omnisolPatients.gender} IS NOT NULL)::int AS other,
      count(*) FILTER (WHERE ${omnisolPatients.gender} IS NULL OR trim(${omnisolPatients.gender}) = '')::int AS unknown_gender,

      -- new vs returning from patientStatus
      count(*) FILTER (WHERE ${omnisolPatients.patientStatus} = 'New')::int AS new_patients,
      count(*) FILTER (WHERE ${omnisolPatients.patientStatus} IS DISTINCT FROM 'New')::int AS returning_patients,

      -- contactability
      count(*) FILTER (WHERE ${omnisolPatients.email} IS NOT NULL AND trim(${omnisolPatients.email}) <> '')::int AS with_email,
      count(*) FILTER (WHERE ${omnisolPatients.phone} IS NOT NULL AND trim(${omnisolPatients.phone}) <> '')::int AS with_phone,

      -- age buckets computed at range end date
      count(*) FILTER (WHERE extract(year from age(${eISO}::date, ${omnisolPatients.dob})) < 13)::int  AS age_0_12,
      count(*) FILTER (WHERE extract(year from age(${eISO}::date, ${omnisolPatients.dob})) BETWEEN 13 AND 17)::int AS age_13_17,
      count(*) FILTER (WHERE extract(year from age(${eISO}::date, ${omnisolPatients.dob})) BETWEEN 18 AND 39)::int AS age_18_39,
      count(*) FILTER (WHERE extract(year from age(${eISO}::date, ${omnisolPatients.dob})) BETWEEN 40 AND 64)::int AS age_40_64,
      count(*) FILTER (WHERE extract(year from age(${eISO}::date, ${omnisolPatients.dob})) >= 65)::int AS age_65p
    FROM ${omnisolVisitations}
    JOIN ${omnisolPatients}
      ON ${omnisolPatients.patientId} = ${omnisolVisitations.patientId}
    WHERE ${whereVisitationsInRange(sISO, eISO)}
  `);

	const H = head[0] ?? {
		visits: 0,
		unique_patients: 0,
		female: 0,
		male: 0,
		other: 0,
		unknown_gender: 0,
		new_patients: 0,
		returning_patients: 0,
		with_email: 0,
		with_phone: 0,
		age_0_12: 0,
		age_13_17: 0,
		age_18_39: 0,
		age_40_64: 0,
		age_65p: 0
	};

	const denom = H.visits || 1; // for share pct
	const pct = (n: number) => (H.visits ? (n / H.visits) * 100 : 0);

	// ---------- B) Category mix (top N) ----------
	const catRows = await db.execute<{ key: string; count: number }>(sql`
    SELECT coalesce(nullif(trim(${omnisolPatients.category}), ''), 'Unknown') AS key,
           count(*)::int AS count
    FROM ${omnisolVisitations}
    JOIN ${omnisolPatients}
      ON ${omnisolPatients.patientId} = ${omnisolVisitations.patientId}
    WHERE ${whereVisitationsInRange(sISO, eISO)}
    GROUP BY 1
    ORDER BY 2 DESC
    LIMIT 10
  `);

	// ---------- Assemble result ----------
	const gender: RatioRow[] = [
		{ key: 'Female', count: H.female, sharePct: pct(H.female) },
		{ key: 'Male', count: H.male, sharePct: pct(H.male) },
		{ key: 'Other', count: H.other, sharePct: pct(H.other) },
		{ key: 'Unknown', count: H.unknown_gender, sharePct: pct(H.unknown_gender) }
	]
		.filter((x) => x.count > 0)
		.sort((a, b) => b.count - a.count);

	const ageBuckets: RatioRow[] = [
		{ key: '0–12', count: H.age_0_12, sharePct: pct(H.age_0_12) },
		{ key: '13–17', count: H.age_13_17, sharePct: pct(H.age_13_17) },
		{ key: '18–39', count: H.age_18_39, sharePct: pct(H.age_18_39) },
		{ key: '40–64', count: H.age_40_64, sharePct: pct(H.age_40_64) },
		{ key: '65+', count: H.age_65p, sharePct: pct(H.age_65p) }
	].filter((x) => x.count > 0);

	const statusMix: RatioRow[] = [
		{ key: 'New', count: H.new_patients, sharePct: pct(H.new_patients) },
		{ key: 'Returning', count: H.returning_patients, sharePct: pct(H.returning_patients) }
	].filter((x) => x.count > 0);

	const totalVisits = H.visits;
	const categoryMix: RatioRow[] = catRows.map((r) => ({
		key: r.key,
		count: r.count,
		sharePct: totalVisits ? (r.count / totalVisits) * 100 : 0
	}));

	return {
		range,
		totals: {
			visits: H.visits,
			uniquePatients: H.unique_patients
		},
		gender,
		ageBuckets,
		statusMix,
		categoryMix,
		contactability: {
			withEmail: H.with_email,
			withPhone: H.with_phone
		}
	};
}

// One-call dashboard
export async function getVisitationsDashboard(
	rangeInput: DateRangeInput
): Promise<VisitationsDashboard> {
	const [summary, byVisitType, byDoctor, dailySeries, demographics] = await Promise.all([
		getVisitationsSummary(rangeInput),
		getVisitationsByVisitType(rangeInput),
		getVisitationsByDoctor(rangeInput),
		getVisitationsDailySeries(rangeInput),
		getVisitationsDemographics(rangeInput)
	]);
	return { summary, byVisitType, byDoctor, dailySeries, demographics };
}
