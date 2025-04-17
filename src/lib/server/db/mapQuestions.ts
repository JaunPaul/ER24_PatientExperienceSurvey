import SurveyJSON from '../../survey/pes.json';
import { PatientExperienceSurveyService } from '../db/index';

export async function mapQuestions() {
	try {
		for (const page of SurveyJSON.pages) {
			if (page.questions && Array.isArray(page.questions)) {
				for (const question of page.questions) {
					const { name, title } = question;
					if (title && name) {
						const questionId = await PatientExperienceSurveyService.getQuestionIdByText(title);
						if (questionId !== null) {
							await PatientExperienceSurveyService.createQuestionMap({
								questionId,
								questionName: name
							});
						} else {
							console.warn(`No question ID found for title "${title}"`);
						}
					}
				}
			}
		}
	} catch (error) {
		console.error('Error mapping questions:', error);
	}
}
