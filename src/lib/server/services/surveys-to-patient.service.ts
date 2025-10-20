// surveys-to-patient.service.ts // adjust path
import { eq, desc } from 'drizzle-orm';
import { omnisolPatients, omnisolSurveysSent } from '../db/schema';
import { db } from '../db';

export type PatientRow = typeof omnisolPatients.$inferSelect;

export interface SurveyPatient {
	patient: PatientRow;
	// optional context you might want in the UI
	survey: {
		id: number;
		responseId: number | null;
		dateSent: string | null; // mode: 'string'
		methodSent: string | null;
		opened: boolean | null;
		completed: boolean | null;
	};
}

/**
 * Returns the patient linked to a given responseId.
 * If multiple survey rows somehow share the same responseId,
 * we return the most recent by dateSent.
 */
export async function getPatientByResponseId(responseId: number): Promise<PatientRow | null> {
	const rows = await db
		.select({
			patient: omnisolPatients
		})
		.from(omnisolSurveysSent)
		.innerJoin(omnisolPatients, eq(omnisolPatients.patientId, omnisolSurveysSent.patientId))
		.where(eq(omnisolSurveysSent.responseId, responseId))
		.orderBy(desc(omnisolSurveysSent.dateSent))
		.limit(1);

	return rows[0]?.patient ?? null;
}

/**
 * Same lookup, but returns useful survey context along with the patient.
 */
export async function getSurveyAndPatientByResponseId(
	responseId: string
): Promise<SurveyPatient | null> {
	const rows = await db
		.select({
			patient: omnisolPatients,
			surveyId: omnisolSurveysSent.id,
			responseId: omnisolSurveysSent.responseId,
			dateSent: omnisolSurveysSent.dateSent,
			methodSent: omnisolSurveysSent.methodSent,
			opened: omnisolSurveysSent.opened,
			completed: omnisolSurveysSent.completed
		})
		.from(omnisolSurveysSent)
		.innerJoin(omnisolPatients, eq(omnisolPatients.patientId, omnisolSurveysSent.patientId))
		.where(eq(omnisolSurveysSent.responseId, responseId))
		.orderBy(desc(omnisolSurveysSent.dateSent))
		.limit(1);

	const r = rows[0];
	if (!r) return null;

	return {
		patient: r.patient,
		survey: {
			id: Number(r.surveyId),
			responseId: r.responseId ?? null,
			dateSent: r.dateSent ?? null,
			methodSent: r.methodSent ?? null,
			opened: r.opened ?? null,
			completed: r.completed ?? null
		}
	};
}
