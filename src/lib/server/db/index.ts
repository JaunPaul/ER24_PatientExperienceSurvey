import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm/expressions';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { responses, answers, questions, questionsMap, dropdownOptions } from './schema';
import PatientExperienceSurveyJSON from '$lib/survey/pes.json';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';
import type { SurveyJSJSONType } from '$lib/shared/types/surveyJSJSONType';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);
const surveyJSON: SurveyJSJSONType = PatientExperienceSurveyJSON as SurveyJSJSONType;
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

	static async getAllMappedQuestions(): Promise<Array<{
		questionId: number;
		questionName: string | null;
	}> | null> {
		try {
			const result = await db.select().from(questionsMap);
			return result.length > 0 ? result : null;
		} catch (error) {
			console.error('Error fetching map', error);
			return null;
		}
	}

	static mapQuestion(
		mappedQuestions: Array<{
			questionId: number;
			questionName: string | null;
		}> | null,
		questionName: string
	): number | null {
		return mappedQuestions !== null
			? mappedQuestions.filter((q) => q.questionName == questionName)[0].questionId
			: null;
	}

	static async processSurveyResponse(surveyResponse: SurveyResponse): Promise<void> {
		const startTime = Date.now();
		try {
			const responseId = await this.createResponse(1);

			if (!responseId) {
				throw new Error('Failed to create response');
			}

			const mappedQuestions = await this.getAllMappedQuestions();
			console.log(mappedQuestions);

			const answerPromises = [];

			for (const [key, value] of Object.entries(surveyResponse)) {
				if (value !== undefined) {
					const questionId = this.mapQuestion(mappedQuestions, key);
					console.log(questionId);
					if (questionId !== null) {
						const question = surveyJSON.pages
							.flatMap((page) => page.questions)
							.find((q) => q.name === key);
						if (question) {
							const answerData: any = { responseId, questionId };

							switch (question.type) {
								case 'comment':
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
									const dropdownSelectionNumber = await this.getDropdownSelectionNumberByQuestionId(
										questionId,
										value
									);
									answerData.answerDropdown = dropdownSelectionNumber;
									break;
								case 'matrix':
									if (typeof value === 'object' && value !== null) {
										for (const [matrixKey, matrixValue] of Object.entries(value)) {
											const matrixAnswerData = {
												...answerData,
												answerText: matrixKey,
												answerRating: matrixValue
											};
											console.log(`Creating matrix answer: ${JSON.stringify(matrixAnswerData)}`);
											answerPromises.push(this.createAnswer(matrixAnswerData));
										}
										continue; // Skip the default createAnswer call
									}
									break;
								case 'nps':
									answerData.answerRating = value;
									break;
								default:
									console.warn(`Unknown question type for key "${key}"`);
							}

							answerPromises.push(this.createAnswer(answerData));
						} else {
							console.warn(`No question found in survey JSON for key "${key}"`);
						}
					} else {
						console.warn(`No mapped question ID found for key "${key}"`);
					}
				}
			}

			await Promise.all(answerPromises);

			const endTime = Date.now();
			console.log('Response took', endTime - startTime, 'ms');
		} catch (error) {
			console.error('Error processing survey response:', error);
			const endTime = Date.now();
			console.log('Response failed in', endTime - startTime, 'ms');
		}
	}
	static async getDropdownSelectionNumberByQuestionId(
		questionId: number,
		optionText: string
	): Promise<number | null> {
		try {
			const result = await db
				.select()
				.from(dropdownOptions)
				.where(eq(dropdownOptions.questionId, questionId));
			const selectionNumber = result.filter((i) => i.optionText == optionText);
			return selectionNumber.length > 0 ? selectionNumber[0].questionId : null;
		} catch (error) {
			return null;
		}
	}
}
