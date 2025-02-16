import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SurveyNotificationService } from '$lib/server/services/surveyNotificationService';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';

export const POST: RequestHandler = async ({ request }) => {
	const messageData: SurveyResponse = await request.json();
	const notificationService = new SurveyNotificationService();
	const notificationResult = notificationService.createMessage(messageData);

	return json(notificationResult);
};
