import {
	getVisitationsDashboard,
	type VisitationsDemographics
} from '$lib/server/services/omnisol-visitations.service';
import type { KpiCard } from '$lib/shared/types/uiTypes';
import { SurveysRanges, type DateRangeInput } from '$lib/shared/utils/dateRangeManagement';

const defaultRange = SurveysRanges.last7Days();

export function buildVisitationDemographicCards(d: VisitationsDemographics): KpiCard[] {
	const fmt = (n: number) => n.toLocaleString();
	const pct = (x: number) => `${x.toFixed(1).replace(/\.0$/, '')}%`;

	const topGender = d.gender[0]?.key ? `${d.gender[0].key} ${pct(d.gender[0].sharePct)}` : '—';
	const topAge = d.ageBuckets.sort((a, b) => b.count - a.count)[0];
	const topCategory = d.categoryMix.sort((a, b) => b.count - a.count)[0];

	return [
		{
			label: 'Visits',
			value: fmt(d.totals.visits),
			detail: `${fmt(d.totals.uniquePatients)} unique patients`
		},
		{ label: 'Top Gender', value: topGender },
		{ label: 'Top Age', value: topAge ? `${topAge.key} ${pct(topAge.sharePct)}` : '—' },
		{
			label: 'New vs Returning',
			value: d.statusMix.map((s) => `${s.key} ${pct(s.sharePct)}`).join(' · ') || '—'
		},
		{
			label: 'Top Category',
			value: topCategory ? `${topCategory.key} ${pct(topCategory.sharePct)}` : '—'
		},
		{
			label: 'Contactable',
			value: `${fmt(d.contactability.withEmail)} email · ${fmt(d.contactability.withPhone)} phone`
		}
	];
}

export async function toOmnsiolVisitationsVM(range: DateRangeInput = defaultRange) {
	const visitations = await getVisitationsDashboard(range);
	const demographicsKpis = buildVisitationDemographicCards(visitations.demographics);

	return { visitations, demographicsKpis };
}
