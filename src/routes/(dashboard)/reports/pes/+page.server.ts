import { toOmnisolSurveysSentVM } from '$lib/shared/dtos/surveys/omnisol-surveys-sent.dto';
import { SurveysRanges, type DateRangeInput } from '$lib/shared/utils/dateRangeManagement';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const filter = url.searchParams.get('filter');

	const vm = await toOmnisolSurveysSentVM(determineDateRange(filter));

	return { vm };
};

function determineDateRange(range?: string | null): DateRangeInput {
	switch (range) {
		case 'last_7':
			return SurveysRanges.last7Days();

		case 'last_30':
			return SurveysRanges.last30Days();
		default:
			return SurveysRanges.last7Days();
	}
}
