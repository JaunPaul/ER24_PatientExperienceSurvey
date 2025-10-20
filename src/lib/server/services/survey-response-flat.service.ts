import { and, asc, desc, eq } from 'drizzle-orm';
import { db } from '../db';
import { surveyResponseFlat } from '../db/schema';

export type SurveyResponseFlatType = typeof surveyResponseFlat.$inferSelect;
export async function getSurveyResponseFlatComments(): Promise<Partial<SurveyResponseFlatType>[]> {
	return await db
		.select<Partial<SurveyResponseFlatType>>({
			responseDate: surveyResponseFlat.responseDate,
			answerText: surveyResponseFlat.answerText,
			responseId: surveyResponseFlat.responseId
		})
		.from(surveyResponseFlat)
		.where(and(eq(surveyResponseFlat.surveyId, 3), eq(surveyResponseFlat.fieldTypeName, 'Comment')))
		.orderBy(desc(surveyResponseFlat.responseDate));
}
