import { toSinglesurveyResponse } from '$lib/shared/dtos/surveys/single-survey-response.dto';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const vm = await toSinglesurveyResponse(params.id);
	return { vm };
};
