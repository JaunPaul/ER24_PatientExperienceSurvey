import { db } from '$lib/server/db';
import { questions, answers, responses, dropdownOptions, omnisolSurveysSent, surveys } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const rawData = await db
        .select({
            questionId: questions.questionId,
            questionText: questions.questionText,
            answerId: answers.answerId,
            answerText: answers.answerText,
            answerRating: answers.answerRating,
            answerBoolean: answers.answerBoolean,
            answerRadio: answers.answerRadio,
            answerDropdownText: dropdownOptions.optionText,
            respondentId: responses.respondentId,
            responseId: responses.responseId,
            createdAt: responses.createdAt,
            patientId: omnisolSurveysSent.patientId,
            surveyName: surveys.surveyName
        })
        .from(questions)
        .leftJoin(answers, eq(questions.questionId, answers.questionId))
        .leftJoin(responses, eq(answers.responseId, responses.responseId))
        .leftJoin(dropdownOptions, eq(answers.answerDropdown, dropdownOptions.optionId))
        .leftJoin(omnisolSurveysSent, eq(responses.responseId, omnisolSurveysSent.responseId))
        .leftJoin(surveys, eq(questions.surveyId, surveys.surveyId))
        .orderBy(questions.questionId, desc(responses.createdAt));

    // Group by question
    const questionsMap = new Map<
        number,
        {
            id: number;
            text: string;
            responses: Array<{
                id: number;
                text: string | number | boolean | null;
                patientId: string | null;
                createdAt: string | null;
            }>;
        }
    >();

    for (const row of rawData) {
        if (!questionsMap.has(row.questionId)) {
            questionsMap.set(row.questionId, {
                id: row.questionId,
                text: row.surveyName ? `${row.questionText} (${row.surveyName})` : row.questionText,
                responses: []
            });
        }

        if (row.answerId) {
            // Determine the answer value
            let value: string | number | boolean | null = null;
            if (row.answerText !== null) value = row.answerText;
            else if (row.answerRating !== null) value = row.answerRating;
            else if (row.answerBoolean !== null) value = row.answerBoolean;
            else if (row.answerRadio !== null) value = row.answerRadio;
            else if (row.answerDropdownText !== null) value = row.answerDropdownText;

            if (value !== null) {
                questionsMap.get(row.questionId)?.responses.push({
                    id: row.responseId!,
                    text: value,
                    patientId: row.patientId,
                    createdAt: row.createdAt
                });
            }
        }
    }

    return {
        questions: Array.from(questionsMap.values())
    };
};
