import {
	omnisolSurveysSent,
	omnisolPatients,
	answers,
	dropdownOptions,
	questionsMap
} from './schema';

export type NewSurveysSent = typeof omnisolSurveysSent.$inferInsert;
export type SurveySent = typeof omnisolSurveysSent.$inferSelect;
export type Patient = typeof omnisolPatients.$inferSelect;
export type NewAnswers = typeof answers.$inferInsert;
export type DropdownOptions = typeof dropdownOptions.$inferSelect;
export type QuestionsMap = typeof questionsMap.$inferSelect;

export enum AgeGroups {
	under18 = 'Under 18',
	gt18 = '18-24',
	gt24 = '25-34',
	gt34 = '35-44',
	gt44 = '45-54',
	gt54 = '55-64',
	gt64 = '65 or older'
}
