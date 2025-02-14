import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm/expressions';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { responses, answers, questions, questionsMap } from './schema';
import PatientExperienceSurveyJSON from '$lib/survey/pes.json';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client);

export abstract class PatientExperienceSurveyService {
	static async createResponse(surveyId: number): Promise<number | null> {
		try {
			const newResponse = await db
				.insert(responses)
				.values({
					surveyId
				})
				.returning();

			// Assuming you want to return the first responseId from the array
			return newResponse.length > 0 ? newResponse[0].responseId : null;
		} catch (error) {
			console.error('Error creating response:', error);
			return null;
		}
	}
	static async createAnswer(answerData: {
		responseId: number;
		questionId: number;
		answerText?: string;
		answerRating?: number;
		answerBoolean?: boolean;
		answerRadio?: string;
		answerDropdown?: number;
	}): Promise<number | null> {
		try {
			const newAnswer = await db.insert(answers).values(answerData).returning();

			// Assuming you want to return the first answerId from the array
			return newAnswer.length > 0 ? newAnswer[0].answerId : null;
		} catch (error) {
			console.error('Error creating answer:', error);
			return null;
		}
	}
	static async getQuestionIdByText(questionText: string): Promise<number | null> {
		try {
			const question = await db
				.select({
					questionId: questions.questionId
				})
				.from(questions)
				.where(eq(questions.questionText, questionText))
				.limit(1);

			// Assuming you want to return the first questionId from the array
			return question.length > 0 ? question[0].questionId : null;
		} catch (error) {
			console.error('Error fetching question ID:', error);
			return null;
		}
	}
	static async createQuestionMap(questionMapData: {
		questionId: number;
		questionName: string;
	}): Promise<number | null> {
		try {
			const newQuestionMap = await db.insert(questionsMap).values(questionMapData).returning();

			// Assuming you want to return the first questionId from the array
			return newQuestionMap.length > 0 ? newQuestionMap[0].questionId : null;
		} catch (error) {
			console.error('Error creating question map:', error);
			return null;
		}
	}

	static async getMappedQuestionId(questionName: string): Promise<number | null> {
		try {
			const result = await db
				.select({
					questionId: questionsMap.questionId
				})
				.from(questionsMap)
				.where(eq(questionsMap.questionName, questionName))
				.limit(1);

			return result.length > 0 ? result[0].questionId : null;
		} catch (error) {
			console.error('Error fetching mapped question ID:', error);
			return null;
		}
	}
	static async processSurveyResponse(surveyResponse: SurveyResponse): Promise<void> {
		try {
			const responseId = await this.createResponse(1);
			if (!responseId) {
				throw new Error('Failed to create response');
			}

			for (const [key, value] of Object.entries(surveyResponse)) {
				if (value !== undefined) {
					const questionId = await this.getMappedQuestionId(key);
					if (questionId !== null) {
						const question = PatientExperienceSurveyJSON.pages
							.flatMap((page) => page.questions)
							.find((q) => q.title === key);
						if (question) {
							const answerData: any = { responseId, questionId };

							switch (question.type) {
								case 'text':
									answerData.answerText = value;
									break;
								case 'rating':
									answerData.answerRating = value;
									break;
								case 'boolean':
									answerData.answerBoolean = value;
									break;
								case 'radiogroup':
									answerData.answerRadio = value;
									break;
								case 'dropdown':
									answerData.answerDropdown = value;
									break;

								default:
									console.warn(`Unknown question type for key "${key}"`);
							}

							await this.createAnswer(answerData);
						}
					} else {
						console.warn(`No mapped question ID found for key "${key}"`);
					}
				}
			}
		} catch (error) {
			console.error('Error processing survey response:', error);
		}
	}
}
