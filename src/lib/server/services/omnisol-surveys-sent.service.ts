// omnisol-surveys-sent.service.ts
import { and, gte, lte, sql } from 'drizzle-orm';
import { db } from '$lib/server/db'; // adjust import to your project
import { omnisolSurveysSent } from '$lib/server/db/schema'; // adjust path if needed
import * as DateManager from '$lib/shared/utils/dateRangeManagement';
// -----------------------------
// Types
// -----------------------------

export interface SurveySummary {
	range: { start: Date; end: Date; label: string };
	totalSent: number;
	openedCount: number;
	completedCount: number;
	averageOpenSeconds: number | null; // null if no opens in range
	openRate: number; // 0..1
	completionRate: number; // 0..1
}

export interface MethodBreakdownRow {
	method: string; // normalized (coalesced)
	count: number;
}

export interface DailySeriesRow {
	day: string; // ISO date (YYYY-MM-DD)
	count: number;
}

export interface SurveysDashboard {
	summary: SurveySummary;
	methods: MethodBreakdownRow[];
	dailySeries: DailySeriesRow[];
}

function rangePredicateISO(startISO: string, endISO: string) {
	return and(gte(omnisolSurveysSent.dateSent, startISO), lte(omnisolSurveysSent.dateSent, endISO));
}

// -----------------------------
// Core pieces
// -----------------------------

// 1) Summary stats
export async function getSurveysSummary(
	rangeInput: DateManager.DateRangeInput
): Promise<SurveySummary> {
	const range = DateManager.resolveRange(rangeInput);
	const startISO = DateManager.toIso(range.start);
	const endISO = DateManager.toIso(range.end);

	// Using Postgres FILTER to keep logic database-side
	const rows = await db
		.select({
			totalSent: sql<number>`count(*)`,
			openedCount: sql<number>`count(*) FILTER (WHERE ${omnisolSurveysSent.opened} = true)`,
			completedCount: sql<number>`count(*) FILTER (WHERE ${omnisolSurveysSent.completed} = true)`,
			averageOpenSeconds: sql<number | null>`
        avg(
          EXTRACT(
            EPOCH FROM (${omnisolSurveysSent.openedDate}::timestamptz - ${omnisolSurveysSent.dateSent}::timestamptz)
          )
        ) FILTER (
          WHERE ${omnisolSurveysSent.opened} = true
            AND ${omnisolSurveysSent.openedDate} IS NOT NULL
        )
      `
		})
		.from(omnisolSurveysSent)
		.where(rangePredicateISO(startISO, endISO));

	const r = rows[0] ?? {
		totalSent: 0,
		openedCount: 0,
		completedCount: 0,
		averageOpenSeconds: null
	};

	const openRate = r.totalSent > 0 ? r.openedCount / r.totalSent : 0;
	const completionRate = r.totalSent > 0 ? r.completedCount / r.totalSent : 0;

	return {
		range: { ...range },
		totalSent: Number(r.totalSent) || 0,
		openedCount: Number(r.openedCount) || 0,
		completedCount: Number(r.completedCount) || 0,
		averageOpenSeconds: r.averageOpenSeconds == null ? null : Number(r.averageOpenSeconds),
		openRate,
		completionRate
	};
}

// 2) Breakdown by method
export async function getSurveysMethodBreakdown(
	rangeInput: DateManager.DateRangeInput
): Promise<MethodBreakdownRow[]> {
	const range = DateManager.resolveRange(rangeInput);
	const startISO = DateManager.toIso(range.start);
	const endISO = DateManager.toIso(range.end);

	// Coalesce method for grouping; normalize blanks to 'unknown'
	const rows = await db
		.select({
			method: sql<string>`coalesce(nullif(trim(${omnisolSurveysSent.methodSent}), ''), 'unknown')`,
			count: sql<number>`count(*)`
		})
		.from(omnisolSurveysSent)
		.where(rangePredicateISO(startISO, endISO))
		.groupBy(sql`coalesce(nullif(trim(${omnisolSurveysSent.methodSent}), ''), 'unknown')`)
		.orderBy(sql`count(*) DESC`);

	return rows.map((r) => ({
		method: r.method,
		count: Number(r.count) || 0
	}));
}

// 3) Daily series for line chart
export async function getSurveysDailySeries(
	rangeInput: DateManager.DateRangeInput
): Promise<DailySeriesRow[]> {
	const range = DateManager.resolveRange(rangeInput);
	const startISO = DateManager.toIso(range.start);
	const endISO = DateManager.toIso(range.end);

	const rows = await db
		.select({
			day: sql<string>`to_char(date_trunc('day', ${omnisolSurveysSent.dateSent}::timestamptz), 'YYYY-MM-DD')`,
			count: sql<number>`count(*)`
		})
		.from(omnisolSurveysSent)
		.where(rangePredicateISO(startISO, endISO))
		.groupBy(sql`date_trunc('day', ${omnisolSurveysSent.dateSent}::timestamptz)`)
		.orderBy(sql`date_trunc('day', ${omnisolSurveysSent.dateSent}::timestamptz) ASC`);

	return rows.map((r) => ({
		day: r.day,
		count: Number(r.count) || 0
	}));
}

// 4) One-call dashboard aggregate
export async function getSurveysDashboard(
	rangeInput: DateManager.DateRangeInput
): Promise<SurveysDashboard> {
	const [summary, methods, dailySeries] = await Promise.all([
		getSurveysSummary(rangeInput),
		getSurveysMethodBreakdown(rangeInput),
		getSurveysDailySeries(rangeInput)
	]);

	return { summary, methods, dailySeries };
}
