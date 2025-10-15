import { toOmnisolSurveysSentVM } from '$lib/shared/dtos/surveys/omnisol-surveys-sent.dto';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const vm = await toOmnisolSurveysSentVM();

	return { vm };
};
