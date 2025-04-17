import { repo } from '$lib/server/db';
import { omnisolSurveysSent } from '$lib/server/db/schema';
import type { NewSurveysSent } from '$lib/server/db/types';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { surveySent, responseId }: { surveySent: NewSurveysSent; responseId: number } =
			await request.json();

		if (!surveySent || !responseId) {
			return json(
				{ error: 'Invalid input: surveySent and responseId are required' },
				{ status: 400 }
			);
		}

		const updatedSurveySent: NewSurveysSent = {
			...surveySent,
			responseId,
			completed: true,
			completedDate: new Date().toISOString()
		};

		const surveySentResponse = await repo.updateSurveySent(
			updatedSurveySent,
			eq(omnisolSurveysSent.id, updatedSurveySent.id!)
		);
		if (!surveySentResponse) {
			return json({ error: 'Failed to update surveySent' }, { status: 500 });
		}

		return json(surveySentResponse);
	} catch (error) {
		console.error('Error updating surveySent:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
