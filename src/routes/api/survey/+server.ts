import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';
import { PatientExperienceSurveyService } from '$lib/server/db';
import type { NewSurveysSent } from '$lib/server/db/types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const {
		surveyData,
		surveyId,
		surveySent
	}: { surveyData: SurveyResponse; surveyId: number; surveySent: NewSurveysSent } =
		await request.json();
	const surveyResponse = await PatientExperienceSurveyService.processSurveyResponse(
		surveyData,
		surveyId
	);

	const updatedSurveySent = await EndpointHelper.updateSurveySent(
		fetch,
		surveySent,
		surveyResponse
	);

	return json({ survey: surveyData, result: { surveyResponse, updatedSurveySent } });
};

abstract class EndpointHelper {
	static updateSurveySent = async (fetch: any, surveySent: NewSurveysSent, responseId: number) => {
		try {
			if (!surveySent) {
				return null;
			}
			const response = await fetch('/api/survey/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify({ surveySent, responseId })
			});

			if (!response.ok) {
				console.error(response);
				return;
			}
			const result = await response.json();
			return result;
		} catch (error) {
			console.error(error);
		}
	};
}
