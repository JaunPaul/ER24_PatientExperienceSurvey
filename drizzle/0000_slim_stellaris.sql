-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "surveys" (
	"survey_id" serial PRIMARY KEY NOT NULL,
	"survey_name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"question_id" serial PRIMARY KEY NOT NULL,
	"survey_id" integer,
	"category_id" integer,
	"question_text" text NOT NULL,
	"field_type_id" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "field_types" (
	"field_type_id" serial PRIMARY KEY NOT NULL,
	"field_type_name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "responses" (
	"response_id" serial PRIMARY KEY NOT NULL,
	"survey_id" integer,
	"respondent_id" uuid DEFAULT uuid_generate_v4(),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "answers" (
	"answer_id" serial PRIMARY KEY NOT NULL,
	"response_id" integer,
	"question_id" integer,
	"answer_text" text,
	"answer_rating" integer,
	"answer_boolean" boolean,
	"answer_radio" text,
	"answer_dropdown" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "dropdown_options" (
	"option_id" serial PRIMARY KEY NOT NULL,
	"question_id" integer,
	"option_text" varchar(255) NOT NULL,
	"selection_number" integer
);
--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_field_type_id_fkey" FOREIGN KEY ("field_type_id") REFERENCES "public"."field_types"("field_type_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("survey_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("survey_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_answer_dropdown_fkey" FOREIGN KEY ("answer_dropdown") REFERENCES "public"."dropdown_options"("option_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("question_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("response_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dropdown_options" ADD CONSTRAINT "dropdown_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("question_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE VIEW "public"."daily_category_averages" AS (SELECT r.survey_id, q.category_id, c.name AS category_name, date(r.created_at) AS response_date, avg(a.answer_rating) AS average_rating, avg( CASE WHEN a.answer_boolean IS TRUE THEN 1 ELSE 0 END) * 100::numeric AS average_true_response_percentage FROM responses r JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id GROUP BY r.survey_id, q.category_id, c.name, (date(r.created_at)) ORDER BY (date(r.created_at)));--> statement-breakpoint
CREATE VIEW "public"."response_counts" AS (SELECT survey_id, count(response_id) AS response_count FROM responses GROUP BY survey_id);--> statement-breakpoint
CREATE VIEW "public"."survey_response_flat" AS (SELECT r.response_id, r.survey_id, s.survey_name, r.respondent_id, q.question_id, q.question_text, c.name AS category_name, ft.field_type_name, a.answer_text, a.answer_rating, a.answer_boolean, a.answer_radio, d.option_text AS answer_dropdown, r.created_at AS response_date FROM responses r JOIN surveys s ON r.survey_id = s.survey_id JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id JOIN field_types ft ON q.field_type_id = ft.field_type_id LEFT JOIN dropdown_options d ON a.answer_dropdown = d.option_id);--> statement-breakpoint
CREATE VIEW "public"."daily_nps_averages" AS (SELECT r.survey_id, q.category_id, c.name AS category_name, date(r.created_at) AS response_date, avg(a.answer_rating) AS average_nps FROM responses r JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id JOIN field_types ft ON q.field_type_id = ft.field_type_id WHERE ft.field_type_name::text = 'NPS'::text GROUP BY r.survey_id, q.category_id, c.name, (date(r.created_at)) ORDER BY (date(r.created_at)));
*/