import { toOmnisolSurveysSentVM } from '$lib/shared/dtos/surveys/omnisol-surveys-sent.dto';
import { determineDateRange } from '$lib/shared/utils/dateRangeManagement';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const filter = url.searchParams.get('filter');

	const vm = await toOmnisolSurveysSentVM(determineDateRange(filter));

	return { vm };
};
