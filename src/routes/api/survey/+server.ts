import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';
import { PatientExperienceSurveyService } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
	const surveyData: SurveyResponse = await request.json();
	console.log(surveyData);
	const surveyResponse = await PatientExperienceSurveyService.createResponse(1);
	console.log(surveyResponse);
	return json({ survey: surveyData, respondent: surveyResponse });
};
