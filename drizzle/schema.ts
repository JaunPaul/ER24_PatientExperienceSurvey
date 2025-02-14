import { pgTable, serial, varchar, timestamp, foreignKey, integer, text, uuid, boolean, pgView, date, numeric, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const surveys = pgTable("surveys", {
	surveyId: serial("survey_id").primaryKey().notNull(),
	surveyName: varchar("survey_name", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const questions = pgTable("questions", {
	questionId: serial("question_id").primaryKey().notNull(),
	surveyId: integer("survey_id"),
	categoryId: integer("category_id"),
	questionText: text("question_text").notNull(),
	fieldTypeId: integer("field_type_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "questions_category_id_fkey"
		}),
	foreignKey({
			columns: [table.fieldTypeId],
			foreignColumns: [fieldTypes.fieldTypeId],
			name: "questions_field_type_id_fkey"
		}),
	foreignKey({
			columns: [table.surveyId],
			foreignColumns: [surveys.surveyId],
			name: "questions_survey_id_fkey"
		}),
]);

export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
});

export const fieldTypes = pgTable("field_types", {
	fieldTypeId: serial("field_type_id").primaryKey().notNull(),
	fieldTypeName: varchar("field_type_name", { length: 50 }).notNull(),
});

export const responses = pgTable("responses", {
	responseId: serial("response_id").primaryKey().notNull(),
	surveyId: integer("survey_id"),
	respondentId: uuid("respondent_id").default(sql`uuid_generate_v4()`),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.surveyId],
			foreignColumns: [surveys.surveyId],
			name: "responses_survey_id_fkey"
		}),
]);

export const answers = pgTable("answers", {
	answerId: serial("answer_id").primaryKey().notNull(),
	responseId: integer("response_id"),
	questionId: integer("question_id"),
	answerText: text("answer_text"),
	answerRating: integer("answer_rating"),
	answerBoolean: boolean("answer_boolean"),
	answerRadio: text("answer_radio"),
	answerDropdown: integer("answer_dropdown"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.answerDropdown],
			foreignColumns: [dropdownOptions.optionId],
			name: "answers_answer_dropdown_fkey"
		}),
	foreignKey({
			columns: [table.questionId],
			foreignColumns: [questions.questionId],
			name: "answers_question_id_fkey"
		}),
	foreignKey({
			columns: [table.responseId],
			foreignColumns: [responses.responseId],
			name: "answers_response_id_fkey"
		}),
]);

export const dropdownOptions = pgTable("dropdown_options", {
	optionId: serial("option_id").primaryKey().notNull(),
	questionId: integer("question_id"),
	optionText: varchar("option_text", { length: 255 }).notNull(),
	selectionNumber: integer("selection_number"),
}, (table) => [
	foreignKey({
			columns: [table.questionId],
			foreignColumns: [questions.questionId],
			name: "dropdown_options_question_id_fkey"
		}),
]);
export const dailyCategoryAverages = pgView("daily_category_averages", {	surveyId: integer("survey_id"),
	categoryId: integer("category_id"),
	categoryName: varchar("category_name", { length: 255 }),
	responseDate: date("response_date"),
	averageRating: numeric("average_rating"),
	averageTrueResponsePercentage: numeric("average_true_response_percentage"),
}).as(sql`SELECT r.survey_id, q.category_id, c.name AS category_name, date(r.created_at) AS response_date, avg(a.answer_rating) AS average_rating, avg( CASE WHEN a.answer_boolean IS TRUE THEN 1 ELSE 0 END) * 100::numeric AS average_true_response_percentage FROM responses r JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id GROUP BY r.survey_id, q.category_id, c.name, (date(r.created_at)) ORDER BY (date(r.created_at))`);

export const responseCounts = pgView("response_counts", {	surveyId: integer("survey_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	responseCount: bigint("response_count", { mode: "number" }),
}).as(sql`SELECT survey_id, count(response_id) AS response_count FROM responses GROUP BY survey_id`);

export const surveyResponseFlat = pgView("survey_response_flat", {	responseId: integer("response_id"),
	surveyId: integer("survey_id"),
	surveyName: varchar("survey_name", { length: 255 }),
	respondentId: uuid("respondent_id"),
	questionId: integer("question_id"),
	questionText: text("question_text"),
	categoryName: varchar("category_name", { length: 255 }),
	fieldTypeName: varchar("field_type_name", { length: 50 }),
	answerText: text("answer_text"),
	answerRating: integer("answer_rating"),
	answerBoolean: boolean("answer_boolean"),
	answerRadio: text("answer_radio"),
	answerDropdown: varchar("answer_dropdown", { length: 255 }),
	responseDate: timestamp("response_date", { mode: 'string' }),
}).as(sql`SELECT r.response_id, r.survey_id, s.survey_name, r.respondent_id, q.question_id, q.question_text, c.name AS category_name, ft.field_type_name, a.answer_text, a.answer_rating, a.answer_boolean, a.answer_radio, d.option_text AS answer_dropdown, r.created_at AS response_date FROM responses r JOIN surveys s ON r.survey_id = s.survey_id JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id JOIN field_types ft ON q.field_type_id = ft.field_type_id LEFT JOIN dropdown_options d ON a.answer_dropdown = d.option_id`);

export const dailyNpsAverages = pgView("daily_nps_averages", {	surveyId: integer("survey_id"),
	categoryId: integer("category_id"),
	categoryName: varchar("category_name", { length: 255 }),
	responseDate: date("response_date"),
	averageNps: numeric("average_nps"),
}).as(sql`SELECT r.survey_id, q.category_id, c.name AS category_name, date(r.created_at) AS response_date, avg(a.answer_rating) AS average_nps FROM responses r JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id JOIN field_types ft ON q.field_type_id = ft.field_type_id WHERE ft.field_type_name::text = 'NPS'::text GROUP BY r.survey_id, q.category_id, c.name, (date(r.created_at)) ORDER BY (date(r.created_at))`);