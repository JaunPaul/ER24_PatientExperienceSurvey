// omnisol-payments.service.ts

import { sql } from 'drizzle-orm';
import { omnisolPayments, omnisolVisitations } from '../db/schema';
import { resolveRange, toIso, type DateRangeInput } from '$lib/shared/utils/dateRangeManagement';
import { db } from '../db';

export interface PaymentsSummaryPerCurrency {
	currency: string; // e.g., "USD", "ZWG", "Unknown"
	totalPayments: number;
	totalAmount: number; // numeric
	avgAmount: number; // numeric
	pendingCount: number;
	pendingAmount: number;
}

export interface PaymentsSummary {
	range: { start: Date; end: Date; label: string };
	// Overall (all currencies combined)
	totalPayments: number;
	totalAmount: number;
	avgAmount: number;
	pendingCount: number;
	pendingAmount: number;
	// Per-currency breakdown
	perCurrency: PaymentsSummaryPerCurrency[];
}

export interface MethodCurrencyBreakdown {
	method: string; // e.g., "Cash", "Medical Aid", "Unknown"
	currency: string; // e.g., "USD", "ZWG", "Unknown"
	total: number; // numeric sum
	count: number; // row count
}

export interface GroupAmount {
	key: string;
	total: number;
	count?: number;
}
export interface DailyAmount {
	day: string;
	amount: number;
}
export interface DailyAmountByCurrency {
	day: string;
	currency: string;
	amount: number;
}

export interface PaymentsDashboard {
	summary: PaymentsSummary;
	byCurrency: GroupAmount[];
	byMethodCurrency: MethodCurrencyBreakdown[];
	dailyAmount: DailyAmountByCurrency[];
}

// -----------------------------
// Range where-clause derived from visitation timestamp
// -----------------------------
const joinPaymentsVisitations = sql`
  FROM ${omnisolPayments}
  JOIN ${omnisolVisitations}
    ON ${omnisolVisitations.visitId} = ${omnisolPayments.visitId}
`;

const whereByVisitationTimestamp = (startISO: string, endISO: string) => sql`
  ${omnisolVisitations.timestamp}::timestamptz
  BETWEEN ${startISO}::timestamptz AND ${endISO}::timestamptz
`;

// Summary
export async function getPaymentsSummary(rangeInput: DateRangeInput): Promise<PaymentsSummary> {
	const range = resolveRange(rangeInput);
	const sISO = toIso(range.start);
	const eISO = toIso(range.end);

	// Overall totals
	const overall = await db.execute<{
		total_payments: number;
		total_amount: string | null;
		avg_amount: string | null;
		pending_count: number;
		pending_amount: string | null;
	}>(sql`
    SELECT
      count(*)::int AS total_payments,
      sum(coalesce(${omnisolPayments.amount}, 0)::numeric) AS total_amount,
      avg(coalesce(${omnisolPayments.amount}, 0)::numeric) AS avg_amount,
      count(*) FILTER (WHERE ${omnisolPayments.status} = 'Pending')::int AS pending_count,
      sum( CASE WHEN ${omnisolPayments.status} = 'Pending'
                THEN coalesce(${omnisolPayments.amount}, 0)::numeric
                ELSE 0 END ) AS pending_amount
    ${joinPaymentsVisitations}
    WHERE ${whereByVisitationTimestamp(sISO, eISO)}
  `);

	// Per-currency breakdown
	const perCur = await db.execute<{
		currency: string;
		total_payments: number;
		total_amount: string | null;
		avg_amount: string | null;
		pending_count: number;
		pending_amount: string | null;
	}>(sql`
    SELECT
      coalesce(nullif(trim(${omnisolPayments.currency}), ''), 'Unknown') AS currency,
      count(*)::int AS total_payments,
      sum(coalesce(${omnisolPayments.amount}, 0)::numeric) AS total_amount,
      avg(coalesce(${omnisolPayments.amount}, 0)::numeric) AS avg_amount,
      count(*) FILTER (WHERE ${omnisolPayments.status} = 'Pending')::int AS pending_count,
      sum( CASE WHEN ${omnisolPayments.status} = 'Pending'
                THEN coalesce(${omnisolPayments.amount}, 0)::numeric
                ELSE 0 END ) AS pending_amount
    ${joinPaymentsVisitations}
    WHERE ${whereByVisitationTimestamp(sISO, eISO)}
    GROUP BY 1
    ORDER BY 2 DESC
  `);

	const toNum = (s: string | null) => (s ? Number(s) : 0);
	const o = overall[0];

	return {
		range,
		totalPayments: o?.total_payments ?? 0,
		totalAmount: toNum(o?.total_amount ?? null),
		avgAmount: toNum(o?.avg_amount ?? null),
		pendingCount: o?.pending_count ?? 0,
		pendingAmount: toNum(o?.pending_amount ?? null),
		perCurrency: perCur.map((r) => ({
			currency: r.currency,
			totalPayments: r.total_payments,
			totalAmount: toNum(r.total_amount),
			avgAmount: toNum(r.avg_amount),
			pendingCount: r.pending_count,
			pendingAmount: toNum(r.pending_amount)
		}))
	};
}

// Currency & Method breakdowns
export async function getPaymentsByCurrency(rangeInput: DateRangeInput): Promise<GroupAmount[]> {
	const { start, end } = resolveRange(rangeInput);
	const sISO = toIso(start),
		eISO = toIso(end);

	const rows = await db.execute<{ key: string; total: string | null }>(sql`
    SELECT coalesce(nullif(trim(${omnisolPayments.currency}), ''), 'Unknown') AS key,
           sum(coalesce(${omnisolPayments.amount}, 0)::numeric) AS total
    ${joinPaymentsVisitations}
    WHERE ${whereByVisitationTimestamp(sISO, eISO)}
    GROUP BY 1 ORDER BY 2 DESC NULLS LAST
  `);
	return rows.map((r) => ({ key: r.key, total: r.total ? Number(r.total) : 0 }));
}

export async function getPaymentsByMethod(rangeInput: DateRangeInput): Promise<GroupAmount[]> {
	const { start, end } = resolveRange(rangeInput);
	const sISO = toIso(start),
		eISO = toIso(end);

	const rows = await db.execute<{ key: string; total: string | null; count: number }>(sql`
    SELECT coalesce(nullif(trim(${omnisolPayments.method}), ''), 'Unknown') AS key,
           sum(coalesce(${omnisolPayments.amount}, 0)::numeric) AS total,
           count(*)::int AS count
    ${joinPaymentsVisitations}
    WHERE ${whereByVisitationTimestamp(sISO, eISO)}
    GROUP BY 1 ORDER BY 2 DESC NULLS LAST
  `);
	return rows.map((r) => ({ key: r.key, total: r.total ? Number(r.total) : 0, count: r.count }));
}

export async function getPaymentsByMethodCurrency(
	rangeInput: DateRangeInput
): Promise<MethodCurrencyBreakdown[]> {
	const { start, end } = resolveRange(rangeInput);
	const sISO = toIso(start),
		eISO = toIso(end);

	const rows = await db.execute<{
		method: string;
		currency: string;
		total: string | null;
		count: number;
	}>(sql`
    SELECT
      coalesce(nullif(trim(${omnisolPayments.method}), ''), 'Unknown')  AS method,
      coalesce(nullif(trim(${omnisolPayments.currency}), ''), 'Unknown') AS currency,
      sum(coalesce(${omnisolPayments.amount}, 0)::numeric)              AS total,
      count(*)::int                                                     AS count
    ${joinPaymentsVisitations}
    WHERE ${whereByVisitationTimestamp(sISO, eISO)}
    GROUP BY 1, 2
    ORDER BY 1 ASC, 2 ASC
  `);

	return rows.map((r) => ({
		method: r.method,
		currency: r.currency,
		total: r.total ? Number(r.total) : 0,
		count: r.count
	}));
}

// Daily amount timeline (aligned to visitation timestamp)

export async function getPaymentsDailyAmountByCurrency(
	rangeInput: DateRangeInput
): Promise<DailyAmountByCurrency[]> {
	const { start, end } = resolveRange(rangeInput);
	const sISO = toIso(start),
		eISO = toIso(end);

	const rows = await db.execute<{ day: string; currency: string; amount: string | null }>(sql`
    SELECT
      to_char(date_trunc('day', ${omnisolVisitations.timestamp}::timestamptz), 'YYYY-MM-DD') AS day,
      coalesce(nullif(trim(${omnisolPayments.currency}), ''), 'Unknown') AS currency,
      sum(coalesce(${omnisolPayments.amount}, 0)::numeric) AS amount
    ${joinPaymentsVisitations}
    WHERE ${whereByVisitationTimestamp(sISO, eISO)}
    GROUP BY 1, 2
    ORDER BY 1 ASC, 2 ASC
  `);

	return rows.map((r) => ({
		day: r.day,
		currency: r.currency,
		amount: r.amount ? Number(r.amount) : 0
	}));
}

// One-call dashboard
export async function getPaymentsDashboard(rangeInput: DateRangeInput): Promise<PaymentsDashboard> {
	const [summary, byCurrency, byMethodCurrency, dailyAmount] = await Promise.all([
		getPaymentsSummary(rangeInput),
		getPaymentsByCurrency(rangeInput),
		getPaymentsByMethodCurrency(rangeInput),
		getPaymentsDailyAmountByCurrency(rangeInput)
	]);

	return { summary, byCurrency, byMethodCurrency, dailyAmount };
}
