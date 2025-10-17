import {
	getPaymentsDashboard,
	type DailyAmount,
	type DailyAmountByCurrency,
	type MethodCurrencyBreakdown,
	type PaymentsDashboard,
	type PaymentsSummary
} from '$lib/server/services/omnisol-payments.service';
import { SurveysRanges, type DateRangeInput } from '$lib/shared/utils/dateRangeManagement';

export interface MethodCurrencyGrouped {
	method: string;
	total: number;
	count: number;
	currencies: Array<{ currency: string; total: number; count: number; sharePct: number }>;
}
const defaultRange = SurveysRanges.last7Days();

export interface OmnisolPaymentsVM extends PaymentsDashboard {
	kpis: KpiCard[];
	groupedMethods: MethodCurrencyGrouped[];
}

type KpiCard = { label: string; value: string; detail?: string };

export function buildPaymentSummaryCards(sum: PaymentsSummary): KpiCard[] {
	const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });
	const cards: KpiCard[] = [{ label: 'Payments', value: fmt(sum.totalPayments) }];

	// Add one card per currency
	sum.perCurrency.forEach((c) => {
		cards.push({
			label: `Total (${c.currency})`,
			value: fmt(c.totalAmount),
			detail: `${c.totalPayments} payments · Pending ${fmt(c.pendingAmount)}`
		});
	});

	return cards;
}

export function groupMethodCurrency(rows: MethodCurrencyBreakdown[]): MethodCurrencyGrouped[] {
	const byMethod = new Map<string, MethodCurrencyGrouped>();

	for (const r of rows) {
		const entry = byMethod.get(r.method) ?? {
			method: r.method,
			total: 0,
			count: 0,
			currencies: []
		};
		entry.total += r.total;
		entry.count += r.count;
		entry.currencies.push({ currency: r.currency, total: r.total, count: r.count, sharePct: 0 });
		byMethod.set(r.method, entry);
	}

	// compute share%
	for (const entry of byMethod.values()) {
		for (const c of entry.currencies) {
			c.sharePct = entry.total > 0 ? (c.total / entry.total) * 100 : 0;
		}
		// sort currencies by total desc for nicer display
		entry.currencies.sort((a, b) => b.total - a.total);
	}

	// stable sort methods by total desc
	return Array.from(byMethod.values()).sort((a, b) => b.total - a.total);
}

export function buildDailyStackedSeries(rows: DailyAmountByCurrency[]): {
	labels: string[];
	series: Array<{ name: string; data: number[] }>;
	total: DailyAmount[];
} {
	// Collect sorted unique days & currencies
	const daySet = new Set<string>();
	const curSet = new Set<string>();
	for (const r of rows) {
		daySet.add(r.day);
		curSet.add(r.currency);
	}
	const labels = Array.from(daySet).sort();
	const currencies = Array.from(curSet).sort();

	// Initialize matrix
	const indexByDay = new Map(labels.map((d, i) => [d, i]));
	const dataByCurrency: Record<string, number[]> = {};
	for (const c of currencies) dataByCurrency[c] = Array(labels.length).fill(0);

	// Fill matrix
	for (const r of rows) {
		const di = indexByDay.get(r.day)!;
		dataByCurrency[r.currency][di] += r.amount;
	}

	// Assemble series & total
	const series = currencies.map((c) => ({ name: c, data: dataByCurrency[c] }));
	const total: DailyAmount[] = labels.map((day, i) => ({
		day,
		amount: currencies.reduce((sum, c) => sum + dataByCurrency[c][i], 0)
	}));

	return { labels, series, total };
}

export async function toOmnsiolPaymentsVM(range: DateRangeInput = defaultRange) {
	const payments = await getPaymentsDashboard(range);
	const kpis = buildPaymentSummaryCards(payments.summary);
	const groupedMethods = groupMethodCurrency(payments.byMethodCurrency);
	const stackedSeries = buildDailyStackedSeries(payments.dailyAmount);
	return { payments, kpis, groupedMethods, stackedSeries };
}
