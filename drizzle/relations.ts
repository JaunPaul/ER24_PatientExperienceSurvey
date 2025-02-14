import { relations } from "drizzle-orm/relations";
import { categories, questions, fieldTypes, surveys, responses, dropdownOptions, answers } from "./schema";

export const questionsRelations = relations(questions, ({one, many}) => ({
	category: one(categories, {
		fields: [questions.categoryId],
		references: [categories.id]
	}),
	fieldType: one(fieldTypes, {
		fields: [questions.fieldTypeId],
		references: [fieldTypes.fieldTypeId]
	}),
	survey: one(surveys, {
		fields: [questions.surveyId],
		references: [surveys.surveyId]
	}),
	answers: many(answers),
	dropdownOptions: many(dropdownOptions),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	questions: many(questions),
}));

export const fieldTypesRelations = relations(fieldTypes, ({many}) => ({
	questions: many(questions),
}));

export const surveysRelations = relations(surveys, ({many}) => ({
	questions: many(questions),
	responses: many(responses),
}));

export const responsesRelations = relations(responses, ({one, many}) => ({
	survey: one(surveys, {
		fields: [responses.surveyId],
		references: [surveys.surveyId]
	}),
	answers: many(answers),
}));

export const answersRelations = relations(answers, ({one}) => ({
	dropdownOption: one(dropdownOptions, {
		fields: [answers.answerDropdown],
		references: [dropdownOptions.optionId]
	}),
	question: one(questions, {
		fields: [answers.questionId],
		references: [questions.questionId]
	}),
	response: one(responses, {
		fields: [answers.responseId],
		references: [responses.responseId]
	}),
}));

export const dropdownOptionsRelations = relations(dropdownOptions, ({one, many}) => ({
	answers: many(answers),
	question: one(questions, {
		fields: [dropdownOptions.questionId],
		references: [questions.questionId]
	}),
}));