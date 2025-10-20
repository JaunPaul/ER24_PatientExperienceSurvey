import { getSurveyResponseFlatByResponseId } from '$lib/server/services/survey-response-flat.service';
import { getSurveyAndPatientByResponseId } from '$lib/server/services/surveys-to-patient.service';

export async function toSinglesurveyResponse(responseId: string) {
	const [answers, patientAndSurvey] = await Promise.all([
		getSurveyResponseFlatByResponseId(responseId),
		getSurveyAndPatientByResponseId(responseId)
	]);
	return { answers, patientAndSurvey };
}
