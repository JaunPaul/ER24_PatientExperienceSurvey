import { repo } from '$lib/server/db';
import { omnisolSurveysSent } from '$lib/server/db/schema';
import type { NewSurveysSent } from '$lib/server/db/types';
import { eq, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const surveySent = await repo.findSurveySent(
		and(
			eq(omnisolSurveysSent.completed, false),
			eq(omnisolSurveysSent.patientId, params.respondent)
		),
		{ orderBy: omnisolSurveysSent.dateSent }
	);

	if (surveySent[0]) {
		const newSurveySent: Partial<NewSurveysSent> = {
			opened: true,
			openedDate: new Date().toISOString()
		};
		await repo.updateSurveySent(newSurveySent, eq(omnisolSurveysSent.patientId, params.respondent));
	}

	return {
		pageData: surveySent[0] ?? undefined
	};
};
