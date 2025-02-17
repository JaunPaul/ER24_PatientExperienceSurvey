import { PRIVATE_N8N_NOTIFICATION_WEBHOOK } from '$env/static/private';
import type { SurveyJSJSONType } from '$lib/shared/types/surveyJSJSONType';
import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';
import { BaseResponse, type FailType, type SuccessType } from './baseResponse';
import PatientExperienceSurveyJSON from '$lib/survey/pes.json';

const surveyJSON: SurveyJSJSONType = PatientExperienceSurveyJSON as SurveyJSJSONType;

export class SurveyNotificationService {
	protected webhookUrl: string;

	constructor() {
		this.webhookUrl = PRIVATE_N8N_NOTIFICATION_WEBHOOK;
	}

	async sendNotification(
		message: string,
		html?: string
	): Promise<BaseResponse<SuccessType | FailType>> {
		console.log('sendNotification called with message:', message);
		try {
			const response = await fetch(this.webhookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message, html })
			});
			console.log('Response received:', response);
			const result = await response.json();
			console.log('Response JSON parsed:', result);
			if (response.ok) {
				console.log('Notification sent successfully');
				return new BaseResponse<SuccessType>(true, 'Notification sent successfully', {
					statusCode: response.status,
					data: result
				});
			} else {
				const errorText = await response.text();
				console.error('Failed to send notification:', errorText);
				return new BaseResponse<FailType>(false, `Failed to send notification: ${errorText}`);
			}
		} catch (error: any) {
			console.error('Error:', error.message);
			return new BaseResponse<FailType>(false, `Error: ${error.message}`);
		}
	}

	extractLowScores(surveyResponse: SurveyResponse): { key: string; value: any }[] {
		const lowScoreKeys: { key: string; value: any }[] = [];

		const checkValue = (key: string, value: any) => {
			if (typeof value === 'number' && value < 3) {
				lowScoreKeys.push({ key, value });
			} else if (
				typeof value === 'string' &&
				(value === 'Poor' ||
					value === 'Very Poor' ||
					value === 'No' ||
					value === 'Not explained' ||
					value === 'Not at all' ||
					value === 'Not available' ||
					value === 'Very inefficient')
			) {
				lowScoreKeys.push({ key, value });
			} else if (typeof value === 'boolean' && value === false) {
				lowScoreKeys.push({ key, value });
			}
		};

		for (const key in surveyResponse) {
			if (surveyResponse.hasOwnProperty(key)) {
				const value = (surveyResponse as any)[key];
				if (typeof value === 'object' && value !== null) {
					for (const subKey in value) {
						if (value.hasOwnProperty(subKey)) {
							checkValue(`${key}.${subKey}`, value[subKey]);
						}
					}
				} else {
					checkValue(key, value);
				}
			}
		}

		return lowScoreKeys;
	}

	mapLowScoresToQuestions(
		lowScores: { key: string; value: any }[]
	): { question: string; answer: any }[] {
		const mappedScores: { question: string; answer: any }[] = [];

		lowScores.forEach(({ key, value }) => {
			const keyParts = key.split('.');
			let questionName = keyParts[keyParts.length - 1];

			surveyJSON.pages.forEach((page) => {
				page.questions.forEach((question) => {
					if (question.name === questionName) {
						mappedScores.push({ question: question.title || question.name, answer: value });
					}
				});
			});
		});

		return mappedScores;
	}

	async createMessage(
		surveyResponse: SurveyResponse
	): Promise<BaseResponse<SuccessType | FailType>> {
		const lowScores = this.extractLowScores(surveyResponse);
		const mappedScores = this.mapLowScoresToQuestions(lowScores);

		let markdownMessage = 'Your survey received low responses to:\n';
		mappedScores.forEach(({ question, answer }) => {
			markdownMessage += `**${question}**: ${answer}\n\n`;
		});
		markdownMessage += '\n';

		let htmlMessage = '<h2>Your survey received low responses to:</h2>';
		mappedScores.forEach(({ question, answer }) => {
			htmlMessage += `<p><strong>${question}</strong>: ${answer}</p>`;
		});
		htmlMessage += '<br>';

		return this.sendNotification(markdownMessage, htmlMessage);
	}
}
