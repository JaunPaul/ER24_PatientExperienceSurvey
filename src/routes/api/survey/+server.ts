import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';
import { PatientExperienceSurveyService } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
	const { surveyData, surveyId }: { surveyData: SurveyResponse; surveyId: number } =
		await request.json();
	const surveyResponse = await PatientExperienceSurveyService.processSurveyResponse(
		surveyData,
		surveyId
	);

	return json({ survey: surveyData, result: surveyResponse });
};
