import {
	getSurveysDashboard,
	type DailySeriesRow,
	type SurveySummary
} from '$lib/server/services/omnisol-surveys-sent.service';
import { SurveysRanges, type DateRangeInput } from '$lib/shared/utils/dateRangeManagement';
export interface SurveySummaryAsPercentagesVM {
	averageOpenMinutes: string | null; // null 44min
	openRate: string; // 3.4%
	completionRate: string; // 85%
}

function formatPercent(value: number, digits = 1): string {
	// value is 0..1 → convert to %
	const pct = (value * 100).toFixed(digits);
	// trim trailing zeros (e.g. 85.0 -> 85)
	const trimmed = pct.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
	return `${trimmed}%`;
}

function formatMinutesFromSeconds(seconds: number | null): string | null {
	if (seconds == null) return null;
	const mins = Math.round(seconds / 60);
	if (mins < 60) return `${mins} min`;
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

// Converter
function toSummaryAsPercentagesVM(data: SurveySummary): SurveySummaryAsPercentagesVM {
	return {
		averageOpenMinutes: formatMinutesFromSeconds(data.averageOpenSeconds),
		openRate: formatPercent(data.openRate, 1),
		completionRate: formatPercent(data.completionRate, 0) // whole % usually reads best
	};
}

const defaultRange = SurveysRanges.last30Days();

type KpiCard = { label: string; value: string; detail?: string };

function formatInt(n: number) {
	return n.toLocaleString(); // 1,234
}

function formatRangeLabel(startISO: string, endISO: string, fallback: string) {
	try {
		const start = new Date(startISO);
		const end = new Date(endISO);
		const fmt: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
		return `${start.toLocaleDateString(undefined, fmt)} → ${end.toLocaleDateString(undefined, fmt)}`;
	} catch {
		return fallback;
	}
}
type SurveyKpiCardsVM = {
	sections: {
		volume: KpiCard[];
		methods: KpiCard[];
		timing: KpiCard[];
	};
};
/**
 * Build KPI cards from your dashboard DTO
 * Expects the exact shape you posted in <output_dto>
 */
export function buildSurveyKpiCards(dto: {
	summary: SurveySummary;
	asPercentages: {
		averageOpenMinutes: string | null;
		openRate: string;
		completionRate: string;
	};
	methods: { method: string; count: number }[];
}) {
	const { summary, asPercentages, methods } = dto;

	// Primary volume KPIs
	const volumeCards: KpiCard[] = [
		{
			label: 'Total Sent',
			value: formatInt(summary.totalSent),
			detail: formatRangeLabel(
				summary.range.start.toString(),
				summary.range.end.toString(),
				summary.range.label
			)
		},
		{
			label: 'Opened',
			value: formatInt(summary.openedCount),
			detail: summary.totalSent > 0 ? `${asPercentages.openRate} open rate` : undefined
		},
		{
			label: 'Completed',
			value: formatInt(summary.completedCount),
			detail: summary.totalSent > 0 ? `${asPercentages.completionRate} completion rate` : undefined
		}
	];

	// Timing KPI
	const timingCards: KpiCard[] = [
		{
			label: 'Avg Time to Open',
			value: asPercentages.averageOpenMinutes ?? '—',
			detail:
				summary.averageOpenSeconds != null
					? `${Math.round(summary.averageOpenSeconds)} sec`
					: 'No opens in range'
		}
	];

	// Channel/method breakdown (only show top method, add more if you like)
	const sortedMethods = [...methods].sort((a, b) => b.count - a.count);
	const top = sortedMethods[0];
	const methodCards: KpiCard[] = top
		? [
				{
					label: 'Top Channel',
					value: top.method,
					detail: `${formatInt(top.count)} sent`
				}
			]
		: [];

	return {
		sections: {
			volume: volumeCards,
			timing: timingCards,
			methods: methodCards
		}
	};
}
export interface SurveysSentVM {
	series: DailySeriesRow[];
	kpis: SurveyKpiCardsVM;
	summary: SurveySummary;
}
export async function toOmnisolSurveysSentVM(
	rangeInput: DateRangeInput = defaultRange
): Promise<SurveysSentVM> {
	const view = await getSurveysDashboard(rangeInput);
	const asPercentages = toSummaryAsPercentagesVM(view.summary);
	const kpis = buildSurveyKpiCards({ summary: view.summary, asPercentages, methods: view.methods });
	return { series: view.dailySeries, kpis, summary: view.summary };
}
