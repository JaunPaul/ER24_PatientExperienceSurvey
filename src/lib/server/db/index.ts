import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, inArray } from 'drizzle-orm';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import {
	responses,
	answers,
	questions,
	questionsMap,
	dropdownOptions,
	omnisolSurveysSent
} from './schema';
import PatientExperienceSurveyJSON from '$lib/survey/pes.json';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';
import type { SurveyJSJSONType } from '$lib/shared/types/surveyJSJSONType';
import type { NewSurveysSent } from './types';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);
const surveyJSON: SurveyJSJSONType = PatientExperienceSurveyJSON as SurveyJSJSONType;
export const db = drizzle(client);
const pool = db.$client;

export abstract class PatientExperienceSurveyService {
	// Cache for mapped questions
	private static mappedQuestionsCache: Array<{
		questionId: number;
		questionName: string | null;
	}> | null = null;

	// Cache for dropdown options - Map<questionId, Map<optionText, optionId>>
	private static dropdownOptionsCache: Map<number, Map<string, number>> = new Map();

	static async createResponse(surveyId: number, submissionDate?: string): Promise<number | null> {
		try {
			const values: { surveyId: number; createdAt?: string } = { surveyId };
			if (submissionDate) {
				values['createdAt'] = submissionDate;
			}
			const [newResponse] = await db.insert(responses).values(values).returning();
			return newResponse?.responseId ?? null;
		} catch (error) {
			console.error('Error creating response:', error);
			return null;
		}
	}

	private static async loadDropdownOptionsForQuestions(questionIds: number[]): Promise<void> {
		try {
			// Fetch all dropdown options for the given question IDs in one query
			const options = await db
				.select({
					questionId: dropdownOptions.questionId,
					optionId: dropdownOptions.optionId,
					optionText: dropdownOptions.optionText,
					selectionNumber: dropdownOptions.selectionNumber
				})
				.from(dropdownOptions)
				.where(inArray(dropdownOptions.questionId, questionIds));

			// Organize into cache
			options.forEach((option) => {
				if (!this.dropdownOptionsCache.has(option.questionId)) {
					this.dropdownOptionsCache.set(option.questionId, new Map());
				}
				// Store the optionId since that's what we need for the foreign key
				this.dropdownOptionsCache.get(option.questionId)?.set(option.optionText, option.optionId);
			});
		} catch (error) {
			console.error('Error loading dropdown options:', error);
			throw error; // Propagate error to handle it in the transaction
		}
	}

	private static async getMappedQuestions(): Promise<
		Array<{
			questionId: number;
			questionName: string | null;
		}>
	> {
		if (!this.mappedQuestionsCache) {
			try {
				const result = await db.select().from(questionsMap);
				this.mappedQuestionsCache = result;
			} catch (error) {
				console.error('Error fetching map:', error);
				return [];
			}
		}
		return this.mappedQuestionsCache ?? [];
	}

	private static mapQuestion(
		mappedQuestions: Array<{
			questionId: number;
			questionName: string | null;
		}>,
		questionName: string
	): number | null {
		// Use Map for O(1) lookup instead of filter
		const questionMap = new Map(mappedQuestions.map((q) => [q.questionName, q.questionId]));
		return questionMap.get(questionName) ?? null;
	}

	static async processSurveyResponse(surveyResponse: SurveyResponse): Promise<number> {
		const startTime = Date.now();
		console.time('totalProcessing');

		try {
			return await db.transaction(async (tx) => {
				console.time('responseCreation');
				const responseId = await this.createResponse(3, surveyResponse.createdAt);
				console.timeEnd('responseCreation');

				if (!responseId) {
					throw new Error('Failed to create response');
				}

				console.time('getMappedQuestions');
				const mappedQuestions = await this.getMappedQuestions();
				console.timeEnd('getMappedQuestions');

				const answersToInsert: any[] = [];
				const dropdownQuestionIds = new Set<number>();

				// Process all answers
				console.time('answerProcessing');
				for (const [key, value] of Object.entries(surveyResponse)) {
					if (value === undefined) continue;

					const questionId = this.mapQuestion(mappedQuestions, key);
					if (!questionId) {
						console.warn(`No mapped question ID found for key "${key}"`);
						continue;
					}

					const question = surveyJSON.pages
						.flatMap((page) => page.questions)
						.find((q) => q.name === key);

					if (!question) {
						console.warn(`No question found in survey JSON for key "${key}"`);
						continue;
					}

					const baseAnswerData = { responseId, questionId };

					if (question.type === 'dropdown') {
						dropdownQuestionIds.add(questionId);
						answersToInsert.push({
							...baseAnswerData,
							dropdownValue: value,
							type: 'dropdown'
						});
						continue;
					}

					// Handle all other types with a lookup map
					const answerMapping: Record<string, any> = {
						comment: { answerText: value },
						rating: { answerRating: value },
						nps: { answerRating: value },
						boolean: { answerBoolean: value },
						radiogroup: { answerRadio: value },
						matrix:
							typeof value === 'object' && value !== null
								? Object.entries(value).map(([matrixKey, matrixValue]) => ({
										...baseAnswerData,
										answerText: matrixKey,
										answerRating: matrixValue
									}))
								: null
					};

					const mappedAnswer = answerMapping[question.type];
					if (mappedAnswer) {
						if (Array.isArray(mappedAnswer)) {
							answersToInsert.push(...mappedAnswer);
						} else {
							answersToInsert.push({ ...baseAnswerData, ...mappedAnswer });
						}
					}
				}
				console.timeEnd('answerProcessing');

				// Load dropdown options in bulk if needed
				if (dropdownQuestionIds.size > 0) {
					console.time('dropdownProcessing');
					await this.loadDropdownOptionsForQuestions([...dropdownQuestionIds]);

					// Process dropdown answers using cache
					answersToInsert.forEach((answer) => {
						if (answer.type === 'dropdown') {
							const optionsMap = this.dropdownOptionsCache.get(answer.questionId);
							answer.answerDropdown = optionsMap?.get(answer.dropdownValue) ?? null;
							delete answer.dropdownValue;
							delete answer.type;
						}
					});
					console.timeEnd('dropdownProcessing');
				}

				// Batch insert in chunks
				console.time('batchInsert');
				const CHUNK_SIZE = 1000;
				for (let i = 0; i < answersToInsert.length; i += CHUNK_SIZE) {
					const chunk = answersToInsert.slice(i, i + CHUNK_SIZE);
					await tx.insert(answers).values(chunk);
				}
				console.timeEnd('batchInsert');

				console.timeEnd('totalProcessing');
				const endTime = Date.now();
				console.log('Response processed successfully in', endTime - startTime, 'ms');
				console.log('Total answers processed:', answersToInsert.length);
				return responseId;
			});
		} catch (error) {
			const endTime = Date.now();
			console.error('Error processing survey response:', error);
			console.log('Response failed in', endTime - startTime, 'ms');
			throw error;
		}
	}
}

class PatientExperienceSurveyRepository {
	constructor(private db: typeof drizzle) {}
	// Generic method to insert data into a table
	async insert<T, D>(table: T, data: D) {
		return await this.db.insert<T>(table).values(data).returning({ id: table.id });
	}

	// Generic method to fetch data from a table
	async find(table: any, where: any, options: { orderBy?: any } = {}) {
		let query = this.db.select().from(table).where(where);
		if (options.orderBy) {
			query = query.orderBy(options.orderBy);
		}
		return await query;
	}

	// Generic method to update data in a table
	async update<T, D>(table: T, data: Partial<D>, where: any) {
		return await this.db.update(table).set(data).where(where).returning();
	}

	async findSurveySent(where: any, options: { orderBy?: any } = {}) {
		return await this.find(omnisolSurveysSent, where, options);
	}

	async updateSurveySent(data: Partial<NewSurveysSent>, where: any) {
		return await this.update(omnisolSurveysSent, data, where);
	}
}

export const repo = new PatientExperienceSurveyRepository(db);
