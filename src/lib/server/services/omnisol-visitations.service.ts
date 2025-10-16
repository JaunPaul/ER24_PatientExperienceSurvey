// omnisol-visitations.service.ts

import { sql } from 'drizzle-orm';
import { omnisolVisitations } from '../db/schema';
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

// One-call dashboard
export async function getVisitationsDashboard(
	rangeInput: DateRangeInput
): Promise<VisitationsDashboard> {
	const [summary, byVisitType, byDoctor, dailySeries] = await Promise.all([
		getVisitationsSummary(rangeInput),
		getVisitationsByVisitType(rangeInput),
		getVisitationsByDoctor(rangeInput),
		getVisitationsDailySeries(rangeInput)
	]);
	return { summary, byVisitType, byDoctor, dailySeries };
}
