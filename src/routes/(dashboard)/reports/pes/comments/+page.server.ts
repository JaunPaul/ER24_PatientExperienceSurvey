import { toSurveyCommentsListVM } from '$lib/shared/dtos/surveys/comments.dto';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const vm = await toSurveyCommentsListVM();
	return { vm };
};
