// omnisol-surveys-sent.service.ts
import { and, gte, lte, sql } from 'drizzle-orm';
import { db } from '$lib/server/db'; // adjust import to your project
import { omnisolSurveysSent } from '$lib/server/db/schema'; // adjust path if needed

// -----------------------------
// Types
// -----------------------------
export type DateRangePreset =
	| 'last_7_days'
	| 'last_30_days'
	| 'last_quarter'
	| 'this_year'
	| 'custom';

export type DateRangeInput =
	| { preset: Exclude<DateRangePreset, 'custom'> }
	| { preset: 'custom'; start: Date; end: Date };

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

// -----------------------------
// Date range helpers
// -----------------------------
function startOfToday(): Date {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	return d;
}

function toIso(x: Date): string {
	return x.toISOString(); // safe for timestamptz bindings
}

function rangePredicateISO(startISO: string, endISO: string) {
	return and(gte(omnisolSurveysSent.dateSent, startISO), lte(omnisolSurveysSent.dateSent, endISO));
}

function startOfYear(date = new Date()): Date {
	return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
}

function daysAgo(n: number): Date {
	const d = startOfToday();
	d.setDate(d.getDate() - (n - 1)); // include today as day 1
	return d;
}

function startOfQuarter(date = new Date()): Date {
	const q = Math.floor(date.getMonth() / 3); // 0..3
	const startMonth = q * 3;
	return new Date(date.getFullYear(), startMonth, 1, 0, 0, 0, 0);
}

function resolveRange(input: DateRangeInput): { start: Date; end: Date; label: string } {
	const todayEnd = new Date(); // now
	switch (input.preset) {
		case 'last_7_days':
			return { start: daysAgo(7), end: todayEnd, label: 'Last 7 days' };
		case 'last_30_days':
			return { start: daysAgo(30), end: todayEnd, label: 'Last 30 days' };
		case 'last_quarter':
			// If you prefer *previous* quarter strictly, adjust logic accordingly.
			return { start: startOfQuarter(), end: todayEnd, label: 'This quarter to date' };
		case 'this_year':
			return { start: startOfYear(), end: todayEnd, label: 'This year to date' };
		case 'custom':
			return { start: input.start, end: input.end, label: 'Custom' };
	}
}

// Common where-clause for date range on dateSent
function rangePredicate(start: Date, end: Date) {
	return and(gte(omnisolSurveysSent.dateSent, start), lte(omnisolSurveysSent.dateSent, end));
}

// -----------------------------
// Core pieces
// -----------------------------

// 1) Summary stats
export async function getSurveysSummary(rangeInput: DateRangeInput): Promise<SurveySummary> {
	const range = resolveRange(rangeInput);
	const startISO = toIso(range.start);
	const endISO = toIso(range.end);

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
	rangeInput: DateRangeInput
): Promise<MethodBreakdownRow[]> {
	const range = resolveRange(rangeInput);
	const startISO = toIso(range.start);
	const endISO = toIso(range.end);

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
export async function getSurveysDailySeries(rangeInput: DateRangeInput): Promise<DailySeriesRow[]> {
	const range = resolveRange(rangeInput);
	const startISO = toIso(range.start);
	const endISO = toIso(range.end);

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
export async function getSurveysDashboard(rangeInput: DateRangeInput): Promise<SurveysDashboard> {
	const [summary, methods, dailySeries] = await Promise.all([
		getSurveysSummary(rangeInput),
		getSurveysMethodBreakdown(rangeInput),
		getSurveysDailySeries(rangeInput)
	]);

	return { summary, methods, dailySeries };
}

// -----------------------------
// Optional convenience presets
// -----------------------------
export const SurveysRanges = {
	last7Days: (): DateRangeInput => ({ preset: 'last_7_days' }),
	last30Days: (): DateRangeInput => ({ preset: 'last_30_days' }),
	thisQuarter: (): DateRangeInput => ({ preset: 'last_quarter' }),
	thisYear: (): DateRangeInput => ({ preset: 'this_year' }),
	custom: (start: Date, end: Date): DateRangeInput => ({ preset: 'custom', start, end })
};
