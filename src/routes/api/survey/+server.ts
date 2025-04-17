import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';
import { PatientExperienceSurveyService, repo } from '$lib/server/db';
import {
	AgeGroups,
	type DropdownOptions,
	type NewAnswers,
	type NewSurveysSent,
	type Patient,
	type QuestionsMap
} from '$lib/server/db/types';
import { eq } from 'drizzle-orm';
import { omnisolPatients } from '$lib/server/db/schema';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const {
		surveyData,
		surveyId,
		surveySent,
		patientId
	}: {
		surveyData: SurveyResponse;
		surveyId: number;
		surveySent: NewSurveysSent;
		patientId?: string;
	} = await request.json();

	const surveyResponse = await PatientExperienceSurveyService.processSurveyResponse(
		surveyData,
		surveyId
	);

	const updatedSurveySent = await EndpointHelper.updateSurveySent(
		fetch,
		surveySent,
		surveyResponse
	);

	if (patientId) {
		const patient = await EndpointHelper.getPatientById(patientId);

		// Ensure the patient exists and has a valid ID
		if (patient?.[0]?.patientId) {
			const gender = EndpointHelper.getGender(patient[0]);
			const ageGroup = EndpointHelper.getAgeGroup(patient[0]);

			// Fetch question IDs and dropdown options in parallel for better performance
			const [genderQuestionId, ageGroupQuestionId, ageGroupDropdownId] = await Promise.all([
				EndpointHelper.getQuestionIdByName(surveyId, 'gender'),
				EndpointHelper.getQuestionIdByName(surveyId, 'ageGroup'),
				ageGroup ? EndpointHelper.getDropdownIdForAgeGroup(ageGroup, surveyId) : null
			]);

			const answers: Array<Partial<NewAnswers>> = [];

			if (gender && genderQuestionId) {
				answers.push({
					questionId: genderQuestionId,
					responseId: surveyResponse,
					answerRadio: gender
				});
			}

			if (ageGroup && ageGroupQuestionId && ageGroupDropdownId) {
				answers.push({
					questionId: ageGroupQuestionId,
					responseId: surveyResponse,
					answerDropdown: ageGroupDropdownId
				});
			}

			// Insert answers in bulk for better performance
			if (answers.length > 0) {
				await Promise.all(answers.map((answer) => repo.insertAnswers(answer)));
			}
		}
	}

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

	static async getPatientById(patientId: string) {
		return await repo.findPatient(eq(omnisolPatients.patientId, patientId));
	}

	static getGender(patient: Patient) {
		return patient.gender;
	}

	static getAgeGroup(patient: Patient) {
		const dob = patient.dob;
		if (dob) {
			const today = new Date();
			const birthDate = new Date(dob);
			let age = today.getFullYear() - birthDate.getFullYear();
			const monthDifference = today.getMonth() - birthDate.getMonth();

			if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}
			if (age < 18) {
				return AgeGroups.under18;
			} else if (age >= 18 && age <= 24) {
				return AgeGroups.gt18;
			} else if (age >= 25 && age <= 34) {
				return AgeGroups.gt24;
			} else if (age >= 35 && age <= 44) {
				return AgeGroups.gt34;
			} else if (age >= 45 && age <= 54) {
				return AgeGroups.gt44;
			} else if (age >= 55 && age <= 64) {
				return AgeGroups.gt54;
			} else {
				return AgeGroups.gt64;
			}
		}
		return null;
	}

	static async getDropdownIdForAgeGroup(ageGroup: string, surveyId: number) {
		const questionId = await this.getQuestionIdByName(surveyId, 'ageGroup');
		const dropdownOptions: Array<DropdownOptions> =
			await repo.findDropdownItemsByQuestionId(questionId);

		return dropdownOptions.find((o) => o.optionText === ageGroup)?.optionId;
	}

	static async getQuestionIdByName(surveyId: number, name: string): Promise<number> {
		const q: Array<QuestionsMap> = await repo.findMappedQuestionBySurveyId(surveyId, name);
		return q[0]?.questionId ?? undefined;
	}
}
