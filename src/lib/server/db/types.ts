import { omnisolSurveysSent } from './schema';

export type NewSurveysSent = typeof omnisolSurveysSent.$inferInsert;
export type SurveySent = typeof omnisolSurveysSent.$inferSelect;
