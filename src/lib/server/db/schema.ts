import {
	pgTable,
	serial,
	varchar,
	timestamp,
	foreignKey,
	integer,
	text,
	index,
	uuid,
	boolean,
	unique,
	json,
	bigint,
	numeric,
	date,
	type AnyPgColumn,
	pgView
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const surveys = pgTable('surveys', {
	surveyId: serial('survey_id').primaryKey().notNull(),
	surveyName: varchar('survey_name', { length: 255 }).notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`)
});

export const questions = pgTable(
	'questions',
	{
		questionId: serial('question_id').primaryKey().notNull(),
		surveyId: integer('survey_id'),
		categoryId: integer('category_id'),
		questionText: text('question_text').notNull(),
		fieldTypeId: integer('field_type_id'),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => [
		foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: 'questions_category_id_fkey'
		}),
		foreignKey({
			columns: [table.fieldTypeId],
			foreignColumns: [fieldTypes.fieldTypeId],
			name: 'questions_field_type_id_fkey'
		}),
		foreignKey({
			columns: [table.surveyId],
			foreignColumns: [surveys.surveyId],
			name: 'questions_survey_id_fkey'
		})
	]
);

export const categories = pgTable('categories', {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull()
});

export const fieldTypes = pgTable('field_types', {
	fieldTypeId: serial('field_type_id').primaryKey().notNull(),
	fieldTypeName: varchar('field_type_name', { length: 50 }).notNull()
});

export const responses = pgTable(
	'responses',
	{
		responseId: serial('response_id').primaryKey().notNull(),
		surveyId: integer('survey_id'),
		respondentId: uuid('respondent_id').default(sql`uuid_generate_v4()`),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => [
		index('idx_responses_survey_id').using(
			'btree',
			table.surveyId.asc().nullsLast().op('int4_ops')
		),
		foreignKey({
			columns: [table.surveyId],
			foreignColumns: [surveys.surveyId],
			name: 'responses_survey_id_fkey'
		})
	]
);

export const answers = pgTable(
	'answers',
	{
		answerId: serial('answer_id').primaryKey().notNull(),
		responseId: integer('response_id'),
		questionId: integer('question_id'),
		answerText: text('answer_text'),
		answerRating: integer('answer_rating'),
		answerBoolean: boolean('answer_boolean'),
		answerRadio: text('answer_radio'),
		answerDropdown: integer('answer_dropdown'),
		createdAt: timestamp('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`)
	},
	(table) => [
		foreignKey({
			columns: [table.answerDropdown],
			foreignColumns: [dropdownOptions.optionId],
			name: 'answers_answer_dropdown_fkey'
		}),
		foreignKey({
			columns: [table.questionId],
			foreignColumns: [questions.questionId],
			name: 'answers_question_id_fkey'
		}),
		foreignKey({
			columns: [table.responseId],
			foreignColumns: [responses.responseId],
			name: 'answers_response_id_fkey'
		})
	]
);

export const dropdownOptions = pgTable(
	'dropdown_options',
	{
		optionId: serial('option_id').primaryKey().notNull(),
		questionId: integer('question_id'),
		optionText: varchar('option_text', { length: 255 }).notNull(),
		selectionNumber: integer('selection_number')
	},
	(table) => [
		foreignKey({
			columns: [table.questionId],
			foreignColumns: [questions.questionId],
			name: 'dropdown_options_question_id_fkey'
		})
	]
);

export const questionsMap = pgTable(
	'questions_map',
	{
		questionId: integer('question_id').primaryKey().notNull(),
		questionName: varchar('question_name', { length: 255 }),
		surveyId: integer('survey_id')
	},
	(table) => [
		foreignKey({
			columns: [table.surveyId],
			foreignColumns: [surveys.surveyId],
			name: 'fk_survey'
		}),
		foreignKey({
			columns: [table.questionId],
			foreignColumns: [questions.questionId],
			name: 'questions_map_question_id_fkey'
		})
	]
);

export const directusNotifications = pgTable(
	'directus_notifications',
	{
		id: serial().primaryKey().notNull(),
		timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		status: varchar({ length: 255 }).default('inbox'),
		recipient: uuid().notNull(),
		sender: uuid(),
		subject: varchar({ length: 255 }).notNull(),
		message: text(),
		collection: varchar({ length: 64 }),
		item: varchar({ length: 255 })
	},
	(table) => [
		foreignKey({
			columns: [table.recipient],
			foreignColumns: [directusUsers.id],
			name: 'directus_notifications_recipient_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.sender],
			foreignColumns: [directusUsers.id],
			name: 'directus_notifications_sender_foreign'
		})
	]
);

export const directusShares = pgTable(
	'directus_shares',
	{
		id: uuid().primaryKey().notNull(),
		name: varchar({ length: 255 }),
		collection: varchar({ length: 64 }).notNull(),
		item: varchar({ length: 255 }).notNull(),
		role: uuid(),
		password: varchar({ length: 255 }),
		userCreated: uuid('user_created'),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		dateStart: timestamp('date_start', { withTimezone: true, mode: 'string' }),
		dateEnd: timestamp('date_end', { withTimezone: true, mode: 'string' }),
		timesUsed: integer('times_used').default(0),
		maxUses: integer('max_uses')
	},
	(table) => [
		foreignKey({
			columns: [table.collection],
			foreignColumns: [directusCollections.collection],
			name: 'directus_shares_collection_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: 'directus_shares_role_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'directus_shares_user_created_foreign'
		}).onDelete('set null')
	]
);

export const directusFlows = pgTable(
	'directus_flows',
	{
		id: uuid().primaryKey().notNull(),
		name: varchar({ length: 255 }).notNull(),
		icon: varchar({ length: 64 }),
		color: varchar({ length: 255 }),
		description: text(),
		status: varchar({ length: 255 }).default('active').notNull(),
		trigger: varchar({ length: 255 }),
		accountability: varchar({ length: 255 }).default('all'),
		options: json(),
		operation: uuid(),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		userCreated: uuid('user_created')
	},
	(table) => [
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'directus_flows_user_created_foreign'
		}).onDelete('set null'),
		unique('directus_flows_operation_unique').on(table.operation)
	]
);

export const directusActivity = pgTable('directus_activity', {
	id: serial().primaryKey().notNull(),
	action: varchar({ length: 45 }).notNull(),
	user: uuid(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	ip: varchar({ length: 50 }),
	userAgent: text('user_agent'),
	collection: varchar({ length: 64 }).notNull(),
	item: varchar({ length: 255 }).notNull(),
	origin: varchar({ length: 255 })
});

export const directusFiles = pgTable(
	'directus_files',
	{
		id: uuid().primaryKey().notNull(),
		storage: varchar({ length: 255 }).notNull(),
		filenameDisk: varchar('filename_disk', { length: 255 }),
		filenameDownload: varchar('filename_download', { length: 255 }).notNull(),
		title: varchar({ length: 255 }),
		type: varchar({ length: 255 }),
		folder: uuid(),
		uploadedBy: uuid('uploaded_by'),
		createdOn: timestamp('created_on', { withTimezone: true, mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		modifiedBy: uuid('modified_by'),
		modifiedOn: timestamp('modified_on', { withTimezone: true, mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		charset: varchar({ length: 50 }),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		filesize: bigint({ mode: 'number' }),
		width: integer(),
		height: integer(),
		duration: integer(),
		embed: varchar({ length: 200 }),
		description: text(),
		location: text(),
		tags: text(),
		metadata: json(),
		focalPointX: integer('focal_point_x'),
		focalPointY: integer('focal_point_y'),
		tusId: varchar('tus_id', { length: 64 }),
		tusData: json('tus_data'),
		uploadedOn: timestamp('uploaded_on', { withTimezone: true, mode: 'string' })
	},
	(table) => [
		foreignKey({
			columns: [table.folder],
			foreignColumns: [directusFolders.id],
			name: 'directus_files_folder_foreign'
		}).onDelete('set null'),
		foreignKey({
			columns: [table.modifiedBy],
			foreignColumns: [directusUsers.id],
			name: 'directus_files_modified_by_foreign'
		}),
		foreignKey({
			columns: [table.uploadedBy],
			foreignColumns: [directusUsers.id],
			name: 'directus_files_uploaded_by_foreign'
		})
	]
);

export const directusCollections = pgTable(
	'directus_collections',
	{
		collection: varchar({ length: 64 }).primaryKey().notNull(),
		icon: varchar({ length: 64 }),
		note: text(),
		displayTemplate: varchar('display_template', { length: 255 }),
		hidden: boolean().default(false).notNull(),
		singleton: boolean().default(false).notNull(),
		translations: json(),
		archiveField: varchar('archive_field', { length: 64 }),
		archiveAppFilter: boolean('archive_app_filter').default(true).notNull(),
		archiveValue: varchar('archive_value', { length: 255 }),
		unarchiveValue: varchar('unarchive_value', { length: 255 }),
		sortField: varchar('sort_field', { length: 64 }),
		accountability: varchar({ length: 255 }).default('all'),
		color: varchar({ length: 255 }),
		itemDuplicationFields: json('item_duplication_fields'),
		sort: integer(),
		group: varchar({ length: 64 }),
		collapse: varchar({ length: 255 }).default('open').notNull(),
		previewUrl: varchar('preview_url', { length: 255 }),
		versioning: boolean().default(false).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.group],
			foreignColumns: [table.collection],
			name: 'directus_collections_group_foreign'
		})
	]
);

export const directusFolders = pgTable(
	'directus_folders',
	{
		id: uuid().primaryKey().notNull(),
		name: varchar({ length: 255 }).notNull(),
		parent: uuid()
	},
	(table) => [
		foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: 'directus_folders_parent_foreign'
		})
	]
);

export const directusRoles = pgTable(
	'directus_roles',
	{
		id: uuid().primaryKey().notNull(),
		name: varchar({ length: 100 }).notNull(),
		icon: varchar({ length: 64 }).default('supervised_user_circle').notNull(),
		description: text(),
		parent: uuid()
	},
	(table) => [
		foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: 'directus_roles_parent_foreign'
		})
	]
);

export const directusFields = pgTable('directus_fields', {
	id: serial().primaryKey().notNull(),
	collection: varchar({ length: 64 }).notNull(),
	field: varchar({ length: 64 }).notNull(),
	special: varchar({ length: 64 }),
	interface: varchar({ length: 64 }),
	options: json(),
	display: varchar({ length: 64 }),
	displayOptions: json('display_options'),
	readonly: boolean().default(false).notNull(),
	hidden: boolean().default(false).notNull(),
	sort: integer(),
	width: varchar({ length: 30 }).default('full'),
	translations: json(),
	note: text(),
	conditions: json(),
	required: boolean().default(false),
	group: varchar({ length: 64 }),
	validation: json(),
	validationMessage: text('validation_message')
});

export const directusUsers = pgTable(
	'directus_users',
	{
		id: uuid().primaryKey().notNull(),
		firstName: varchar('first_name', { length: 50 }),
		lastName: varchar('last_name', { length: 50 }),
		email: varchar({ length: 128 }),
		password: varchar({ length: 255 }),
		location: varchar({ length: 255 }),
		title: varchar({ length: 50 }),
		description: text(),
		tags: json(),
		avatar: uuid(),
		language: varchar({ length: 255 }).default(sql`NULL`),
		tfaSecret: varchar('tfa_secret', { length: 255 }),
		status: varchar({ length: 16 }).default('active').notNull(),
		role: uuid(),
		token: varchar({ length: 255 }),
		lastAccess: timestamp('last_access', { withTimezone: true, mode: 'string' }),
		lastPage: varchar('last_page', { length: 255 }),
		provider: varchar({ length: 128 }).default('default').notNull(),
		externalIdentifier: varchar('external_identifier', { length: 255 }),
		authData: json('auth_data'),
		emailNotifications: boolean('email_notifications').default(true),
		appearance: varchar({ length: 255 }),
		themeDark: varchar('theme_dark', { length: 255 }),
		themeLight: varchar('theme_light', { length: 255 }),
		themeLightOverrides: json('theme_light_overrides'),
		themeDarkOverrides: json('theme_dark_overrides')
	},
	(table) => [
		foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: 'directus_users_role_foreign'
		}).onDelete('set null'),
		unique('directus_users_email_unique').on(table.email),
		unique('directus_users_token_unique').on(table.token),
		unique('directus_users_external_identifier_unique').on(table.externalIdentifier)
	]
);

export const directusPermissions = pgTable(
	'directus_permissions',
	{
		id: serial().primaryKey().notNull(),
		collection: varchar({ length: 64 }).notNull(),
		action: varchar({ length: 10 }).notNull(),
		permissions: json(),
		validation: json(),
		presets: json(),
		fields: text(),
		policy: uuid().notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.policy],
			foreignColumns: [directusPolicies.id],
			name: 'directus_permissions_policy_foreign'
		}).onDelete('cascade')
	]
);

export const directusRevisions = pgTable(
	'directus_revisions',
	{
		id: serial().primaryKey().notNull(),
		activity: integer().notNull(),
		collection: varchar({ length: 64 }).notNull(),
		item: varchar({ length: 255 }).notNull(),
		data: json(),
		delta: json(),
		parent: integer(),
		version: uuid()
	},
	(table) => [
		foreignKey({
			columns: [table.activity],
			foreignColumns: [directusActivity.id],
			name: 'directus_revisions_activity_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.parent],
			foreignColumns: [table.id],
			name: 'directus_revisions_parent_foreign'
		}),
		foreignKey({
			columns: [table.version],
			foreignColumns: [directusVersions.id],
			name: 'directus_revisions_version_foreign'
		}).onDelete('cascade')
	]
);

export const directusSessions = pgTable(
	'directus_sessions',
	{
		token: varchar({ length: 64 }).primaryKey().notNull(),
		user: uuid(),
		expires: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
		ip: varchar({ length: 255 }),
		userAgent: text('user_agent'),
		share: uuid(),
		origin: varchar({ length: 255 }),
		nextToken: varchar('next_token', { length: 64 })
	},
	(table) => [
		foreignKey({
			columns: [table.share],
			foreignColumns: [directusShares.id],
			name: 'directus_sessions_share_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: 'directus_sessions_user_foreign'
		}).onDelete('cascade')
	]
);

export const directusRelations = pgTable('directus_relations', {
	id: serial().primaryKey().notNull(),
	manyCollection: varchar('many_collection', { length: 64 }).notNull(),
	manyField: varchar('many_field', { length: 64 }).notNull(),
	oneCollection: varchar('one_collection', { length: 64 }),
	oneField: varchar('one_field', { length: 64 }),
	oneCollectionField: varchar('one_collection_field', { length: 64 }),
	oneAllowedCollections: text('one_allowed_collections'),
	junctionField: varchar('junction_field', { length: 64 }),
	sortField: varchar('sort_field', { length: 64 }),
	oneDeselectAction: varchar('one_deselect_action', { length: 255 }).default('nullify').notNull()
});

export const directusPresets = pgTable(
	'directus_presets',
	{
		id: serial().primaryKey().notNull(),
		bookmark: varchar({ length: 255 }),
		user: uuid(),
		role: uuid(),
		collection: varchar({ length: 64 }),
		search: varchar({ length: 100 }),
		layout: varchar({ length: 100 }).default('tabular'),
		layoutQuery: json('layout_query'),
		layoutOptions: json('layout_options'),
		refreshInterval: integer('refresh_interval'),
		filter: json(),
		icon: varchar({ length: 64 }).default('bookmark'),
		color: varchar({ length: 255 })
	},
	(table) => [
		foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: 'directus_presets_role_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: 'directus_presets_user_foreign'
		}).onDelete('cascade')
	]
);

export const directusMigrations = pgTable('directus_migrations', {
	version: varchar({ length: 255 }).primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`)
});

export const directusPanels = pgTable(
	'directus_panels',
	{
		id: uuid().primaryKey().notNull(),
		dashboard: uuid().notNull(),
		name: varchar({ length: 255 }),
		icon: varchar({ length: 64 }).default(sql`NULL`),
		color: varchar({ length: 10 }),
		showHeader: boolean('show_header').default(false).notNull(),
		note: text(),
		type: varchar({ length: 255 }).notNull(),
		positionX: integer('position_x').notNull(),
		positionY: integer('position_y').notNull(),
		width: integer().notNull(),
		height: integer().notNull(),
		options: json(),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		userCreated: uuid('user_created')
	},
	(table) => [
		foreignKey({
			columns: [table.dashboard],
			foreignColumns: [directusDashboards.id],
			name: 'directus_panels_dashboard_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'directus_panels_user_created_foreign'
		}).onDelete('set null')
	]
);

export const directusDashboards = pgTable(
	'directus_dashboards',
	{
		id: uuid().primaryKey().notNull(),
		name: varchar({ length: 255 }).notNull(),
		icon: varchar({ length: 64 }).default('dashboard').notNull(),
		note: text(),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		userCreated: uuid('user_created'),
		color: varchar({ length: 255 })
	},
	(table) => [
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'directus_dashboards_user_created_foreign'
		}).onDelete('set null')
	]
);

export const directusOperations = pgTable(
	'directus_operations',
	{
		id: uuid().primaryKey().notNull(),
		name: varchar({ length: 255 }),
		key: varchar({ length: 255 }).notNull(),
		type: varchar({ length: 255 }).notNull(),
		positionX: integer('position_x').notNull(),
		positionY: integer('position_y').notNull(),
		options: json(),
		resolve: uuid(),
		reject: uuid(),
		flow: uuid().notNull(),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		userCreated: uuid('user_created')
	},
	(table) => [
		foreignKey({
			columns: [table.flow],
			foreignColumns: [directusFlows.id],
			name: 'directus_operations_flow_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.reject],
			foreignColumns: [table.id],
			name: 'directus_operations_reject_foreign'
		}),
		foreignKey({
			columns: [table.resolve],
			foreignColumns: [table.id],
			name: 'directus_operations_resolve_foreign'
		}),
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'directus_operations_user_created_foreign'
		}).onDelete('set null'),
		unique('directus_operations_resolve_unique').on(table.resolve),
		unique('directus_operations_reject_unique').on(table.reject)
	]
);

export const directusTranslations = pgTable('directus_translations', {
	id: uuid().primaryKey().notNull(),
	language: varchar({ length: 255 }).notNull(),
	key: varchar({ length: 255 }).notNull(),
	value: text().notNull()
});

export const directusAccess = pgTable(
	'directus_access',
	{
		id: uuid().primaryKey().notNull(),
		role: uuid(),
		user: uuid(),
		policy: uuid().notNull(),
		sort: integer()
	},
	(table) => [
		foreignKey({
			columns: [table.policy],
			foreignColumns: [directusPolicies.id],
			name: 'directus_access_policy_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.role],
			foreignColumns: [directusRoles.id],
			name: 'directus_access_role_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.user],
			foreignColumns: [directusUsers.id],
			name: 'directus_access_user_foreign'
		}).onDelete('cascade')
	]
);

export const directusComments = pgTable(
	'directus_comments',
	{
		id: uuid().primaryKey().notNull(),
		collection: varchar({ length: 64 }).notNull(),
		item: varchar({ length: 255 }).notNull(),
		comment: text().notNull(),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		dateUpdated: timestamp('date_updated', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		userCreated: uuid('user_created'),
		userUpdated: uuid('user_updated')
	},
	(table) => [
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'directus_comments_user_created_foreign'
		}).onDelete('set null'),
		foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: 'directus_comments_user_updated_foreign'
		})
	]
);

export const directusVersions = pgTable(
	'directus_versions',
	{
		id: uuid().primaryKey().notNull(),
		key: varchar({ length: 64 }).notNull(),
		name: varchar({ length: 255 }),
		collection: varchar({ length: 64 }).notNull(),
		item: varchar({ length: 255 }).notNull(),
		hash: varchar({ length: 255 }),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		dateUpdated: timestamp('date_updated', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		),
		userCreated: uuid('user_created'),
		userUpdated: uuid('user_updated'),
		delta: json()
	},
	(table) => [
		foreignKey({
			columns: [table.collection],
			foreignColumns: [directusCollections.collection],
			name: 'directus_versions_collection_foreign'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'directus_versions_user_created_foreign'
		}).onDelete('set null'),
		foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: 'directus_versions_user_updated_foreign'
		})
	]
);

export const directusExtensions = pgTable('directus_extensions', {
	enabled: boolean().default(true).notNull(),
	id: uuid().primaryKey().notNull(),
	folder: varchar({ length: 255 }).notNull(),
	source: varchar({ length: 255 }).notNull(),
	bundle: uuid()
});

export const directusWebhooks = pgTable(
	'directus_webhooks',
	{
		id: serial().primaryKey().notNull(),
		name: varchar({ length: 255 }).notNull(),
		method: varchar({ length: 10 }).default('POST').notNull(),
		url: varchar({ length: 255 }).notNull(),
		status: varchar({ length: 10 }).default('active').notNull(),
		data: boolean().default(true).notNull(),
		actions: varchar({ length: 100 }).notNull(),
		collections: varchar({ length: 255 }).notNull(),
		headers: json(),
		wasActiveBeforeDeprecation: boolean('was_active_before_deprecation').default(false).notNull(),
		migratedFlow: uuid('migrated_flow')
	},
	(table) => [
		foreignKey({
			columns: [table.migratedFlow],
			foreignColumns: [directusFlows.id],
			name: 'directus_webhooks_migrated_flow_foreign'
		}).onDelete('set null')
	]
);

export const directusSettings = pgTable(
	'directus_settings',
	{
		id: serial().primaryKey().notNull(),
		projectName: varchar('project_name', { length: 100 }).default('Directus').notNull(),
		projectUrl: varchar('project_url', { length: 255 }),
		projectColor: varchar('project_color', { length: 255 }).default('#6644FF').notNull(),
		projectLogo: uuid('project_logo'),
		publicForeground: uuid('public_foreground'),
		publicBackground: uuid('public_background'),
		publicNote: text('public_note'),
		authLoginAttempts: integer('auth_login_attempts').default(25),
		authPasswordPolicy: varchar('auth_password_policy', { length: 100 }),
		storageAssetTransform: varchar('storage_asset_transform', { length: 7 }).default('all'),
		storageAssetPresets: json('storage_asset_presets'),
		customCss: text('custom_css'),
		storageDefaultFolder: uuid('storage_default_folder'),
		basemaps: json(),
		mapboxKey: varchar('mapbox_key', { length: 255 }),
		moduleBar: json('module_bar'),
		projectDescriptor: varchar('project_descriptor', { length: 100 }),
		defaultLanguage: varchar('default_language', { length: 255 }).default('en-US').notNull(),
		customAspectRatios: json('custom_aspect_ratios'),
		publicFavicon: uuid('public_favicon'),
		defaultAppearance: varchar('default_appearance', { length: 255 }).default('auto').notNull(),
		defaultThemeLight: varchar('default_theme_light', { length: 255 }),
		themeLightOverrides: json('theme_light_overrides'),
		defaultThemeDark: varchar('default_theme_dark', { length: 255 }),
		themeDarkOverrides: json('theme_dark_overrides'),
		reportErrorUrl: varchar('report_error_url', { length: 255 }),
		reportBugUrl: varchar('report_bug_url', { length: 255 }),
		reportFeatureUrl: varchar('report_feature_url', { length: 255 }),
		publicRegistration: boolean('public_registration').default(false).notNull(),
		publicRegistrationVerifyEmail: boolean('public_registration_verify_email')
			.default(true)
			.notNull(),
		publicRegistrationRole: uuid('public_registration_role'),
		publicRegistrationEmailFilter: json('public_registration_email_filter')
	},
	(table) => [
		foreignKey({
			columns: [table.projectLogo],
			foreignColumns: [directusFiles.id],
			name: 'directus_settings_project_logo_foreign'
		}),
		foreignKey({
			columns: [table.publicBackground],
			foreignColumns: [directusFiles.id],
			name: 'directus_settings_public_background_foreign'
		}),
		foreignKey({
			columns: [table.publicFavicon],
			foreignColumns: [directusFiles.id],
			name: 'directus_settings_public_favicon_foreign'
		}),
		foreignKey({
			columns: [table.publicForeground],
			foreignColumns: [directusFiles.id],
			name: 'directus_settings_public_foreground_foreign'
		}),
		foreignKey({
			columns: [table.publicRegistrationRole],
			foreignColumns: [directusRoles.id],
			name: 'directus_settings_public_registration_role_foreign'
		}).onDelete('set null'),
		foreignKey({
			columns: [table.storageDefaultFolder],
			foreignColumns: [directusFolders.id],
			name: 'directus_settings_storage_default_folder_foreign'
		}).onDelete('set null')
	]
);

export const directusPolicies = pgTable('directus_policies', {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	icon: varchar({ length: 64 }).default('badge').notNull(),
	description: text(),
	ipAccess: text('ip_access'),
	enforceTfa: boolean('enforce_tfa').default(false).notNull(),
	adminAccess: boolean('admin_access').default(false).notNull(),
	appAccess: boolean('app_access').default(false).notNull()
});

export const clinicalDepartmentDailyReport = pgTable(
	'clinical_department_daily_report',
	{
		id: serial().primaryKey().notNull(),
		userCreated: uuid('user_created'),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }),
		userUpdated: uuid('user_updated'),
		dateUpdated: timestamp('date_updated', { withTimezone: true, mode: 'string' }),
		reportDate: timestamp('report_date', { mode: 'string' }),
		drugsAndSundryStock: text('drugs_and_sundry_stock'),
		equipmentStationary: text('equipment_stationary'),
		ancillaryServices: text('ancillary_services'),
		maintenanceIssuesFaults: text('maintenance_issues_faults'),
		incidentReport: text('incident_report'),
		patientCareComplaints: text('patient_care_complaints'),
		patientManagementComplaints: text('patient_management_complaints'),
		supervisorComments: text('supervisor_comments')
	},
	(table) => [
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'clinical_department_daily_report_user_created_foreign'
		}),
		foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: 'clinical_department_daily_report_user_updated_foreign'
		})
	]
);

export const dailyPatientReport = pgTable(
	'daily_patient_report',
	{
		id: serial().primaryKey().notNull(),
		sort: integer(),
		userCreated: uuid('user_created'),
		dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }),
		userUpdated: uuid('user_updated'),
		dateUpdated: timestamp('date_updated', { withTimezone: true, mode: 'string' }),
		reportDate: timestamp('report_date', { mode: 'string' }),
		totalPatients: integer('Total_Patients'),
		malePatients: integer('male_patients'),
		femalePatients: integer('female_patients'),
		paediatricPatients: integer('paediatric_patients'),
		cashPatients: integer('cash_patients'),
		medicalAidPatients: integer('medical_aid_patients'),
		guarenteePatients: integer('guarentee_patients'),
		medicalAidPayments: json('medical_aid_payments'),
		guaranteePayments: json('guarantee_payments'),
		referrals: json(),
		admissions: json(),
		cases: json(),
		newPatients: integer('new_patients'),
		existingPatients: integer('existing_patients'),
		usdPatients: integer('usd_patients'),
		zigPatients: varchar('zig_patients', { length: 255 }),
		totalBanked: numeric('total_banked', { precision: 10, scale: 5 }),
		totalReceipted: numeric('total_receipted', { precision: 10, scale: 5 }),
		totalUsdSwiped: numeric('total_usd_swiped', { precision: 10, scale: 5 }),
		totalZigSwiped: numeric('total_zig_swiped', { precision: 10, scale: 5 }),
		totalEcocash: numeric('total_ecocash', { precision: 10, scale: 5 })
	},
	(table) => [
		foreignKey({
			columns: [table.userCreated],
			foreignColumns: [directusUsers.id],
			name: 'daily_patient_report_user_created_foreign'
		}),
		foreignKey({
			columns: [table.userUpdated],
			foreignColumns: [directusUsers.id],
			name: 'daily_patient_report_user_updated_foreign'
		})
	]
);

export const omnisolPatients = pgTable(
	'omnisol_patients',
	{
		id: serial().primaryKey().notNull(),
		patientId: varchar('patient_id', { length: 20 }).notNull(),
		name: varchar({ length: 100 }).notNull(),
		lastname: varchar({ length: 100 }).notNull(),
		email: varchar({ length: 255 }),
		gender: varchar({ length: 10 }),
		dob: date().notNull(),
		ageGroup: varchar('age_group', { length: 50 }),
		category: varchar({ length: 50 }),
		patientStatus: varchar('patient_status', { length: 20 }),
		phone: varchar({ length: 255 })
	},
	(table) => [
		unique('omnisol_patients_patient_id_key').on(table.patientId),
		unique('omnisol_patients_email_key').on(table.email)
	]
);

export const omnisolAddresses = pgTable(
	'omnisol_addresses',
	{
		id: serial().primaryKey().notNull(),
		patientId: varchar('patient_id', { length: 20 }).notNull(),
		line1: varchar({ length: 255 }),
		line2: varchar({ length: 255 }),
		city: varchar({ length: 100 }),
		province: varchar({ length: 100 }),
		postalcode: varchar({ length: 20 })
	},
	(table) => [
		foreignKey({
			columns: [table.patientId],
			foreignColumns: [omnisolPatients.patientId],
			name: 'omnisol_addresses_patient_id_fkey'
		}),
		unique('omnisol_addresses_patient_id_key').on(table.patientId)
	]
);

export const omnisolVisitations = pgTable(
	'omnisol_visitations',
	{
		id: serial().primaryKey().notNull(),
		visitId: varchar('visit_id', { length: 20 }).notNull(),
		patientId: varchar('patient_id', { length: 20 }).notNull(),
		visitDate: date('visit_date').notNull(),
		timestamp: timestamp({ mode: 'string' }).notNull(),
		visitType: varchar('visit_type', { length: 255 }),
		doctor: varchar({ length: 100 }),
		medicalAidId: integer('medical_aid_id'),
		admissionId: integer('admission_id'),
		referralId: integer('referral_id'),
		paymentId: integer('payment_id')
	},
	(table) => [
		foreignKey({
			columns: [table.admissionId],
			foreignColumns: [omnisolAdmissions.id],
			name: 'omnisol_visitations_admission_id_fkey'
		}),
		foreignKey({
			columns: [table.medicalAidId],
			foreignColumns: [omnisolMedicalAid.id],
			name: 'omnisol_visitations_medical_aid_id_fkey'
		}),
		foreignKey({
			columns: [table.patientId],
			foreignColumns: [omnisolPatients.patientId],
			name: 'omnisol_visitations_patient_id_fkey'
		}),
		foreignKey({
			columns: [table.paymentId],
			foreignColumns: [omnisolPayments.id],
			name: 'omnisol_visitations_payment_id_fkey'
		}),
		foreignKey({
			columns: [table.referralId],
			foreignColumns: [omnisolReferrals.id],
			name: 'omnisol_visitations_referral_id_fkey'
		}),
		unique('omnisol_visitations_visit_id_key').on(table.visitId)
	]
);

export const omnisolMedicalAid = pgTable(
	'omnisol_medical_aid',
	{
		id: serial().primaryKey().notNull(),
		visitId: varchar('visit_id', { length: 20 }).notNull(),
		provider: varchar({ length: 100 }),
		membershipNumber: varchar('membership_number', { length: 50 })
	},
	(table) => [
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_medical_aid_visit_id_fkey'
		}),
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_medical_aid_visit_id_fkey1'
		}),
		unique('omnisol_medical_aid_visit_id_key').on(table.visitId)
	]
);

export const omnisolAdmissions = pgTable(
	'omnisol_admissions',
	{
		id: serial().primaryKey().notNull(),
		visitId: varchar('visit_id', { length: 20 }).notNull(),
		status: boolean().notNull(),
		hospital: varchar({ length: 100 }),
		doctor: varchar({ length: 100 })
	},
	(table) => [
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_admissions_visit_id_fkey'
		}),
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_admissions_visit_id_fkey1'
		}),
		unique('omnisol_admissions_visit_id_key').on(table.visitId)
	]
);

export const omnisolReferrals = pgTable(
	'omnisol_referrals',
	{
		id: serial().primaryKey().notNull(),
		visitId: varchar('visit_id', { length: 20 }).notNull(),
		referredBy: varchar('referred_by', { length: 100 }),
		referredTo: varchar('referred_to', { length: 100 })
	},
	(table) => [
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_referrals_visit_id_fkey'
		}),
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_referrals_visit_id_fkey1'
		}),
		unique('omnisol_referrals_visit_id_key').on(table.visitId)
	]
);

export const omnisolPayments = pgTable(
	'omnisol_payments',
	{
		id: serial().primaryKey().notNull(),
		visitId: varchar('visit_id', { length: 20 }).notNull(),
		method: varchar({ length: 50 }),
		currency: varchar({ length: 10 }),
		amount: numeric({ precision: 10, scale: 2 }),
		status: varchar({ length: 20 })
	},
	(table) => [
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_payments_visit_id_fkey'
		}),
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_payments_visit_id_fkey1'
		}),
		unique('omnisol_payments_visit_id_key').on(table.visitId)
	]
);

export const omnisolDiagnoses = pgTable(
	'omnisol_diagnoses',
	{
		id: serial().primaryKey().notNull(),
		visitId: varchar('visit_id', { length: 20 }).notNull(),
		diagnosis: varchar({ length: 100 })
	},
	(table) => [
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_diagnoses_visit_id_fkey'
		}),
		foreignKey({
			columns: [table.visitId],
			foreignColumns: [omnisolVisitations.visitId],
			name: 'omnisol_diagnoses_visit_id_fkey1'
		})
	]
);

export const omnisolSurveysSent = pgTable(
	'omnisol_surveys_sent',
	{
		id: serial().primaryKey().notNull(),
		patientId: varchar('patient_id', { length: 20 }).notNull(),
		responseId: integer('response_id'),
		dateSent: timestamp('date_sent', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
		methodSent: varchar('method_sent', { length: 50 }),
		surveyUrl: text('survey_url'),
		opened: boolean().default(false),
		openedDate: timestamp('opened_date', { mode: 'string' }),
		completed: boolean().default(false),
		completedDate: timestamp('completed_date', { mode: 'string' })
	},
	(table) => [
		foreignKey({
			columns: [table.patientId],
			foreignColumns: [omnisolPatients.patientId],
			name: 'omnisol_surveys_sent_patient_id_fkey'
		}),
		foreignKey({
			columns: [table.responseId],
			foreignColumns: [responses.responseId],
			name: 'omnisol_surveys_sent_response_id_fkey'
		})
	]
);

export const omnisolWebhookResponses = pgTable('omnisol_webhook_responses', {
	id: uuid().primaryKey().notNull(),
	dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }),
	requestJson: json('request_json')
});

export const omnisolWebhookErrors = pgTable('omnisol_webhook_errors', {
	id: serial().primaryKey().notNull(),
	dateCreated: timestamp('date_created', { withTimezone: true, mode: 'string' }),
	webhookId: uuid('webhook_id'),
	webhookError: json('webhook_error')
});
export const dailyCategoryAverages = pgView('daily_category_averages', {
	surveyId: integer('survey_id'),
	categoryId: integer('category_id'),
	categoryName: varchar('category_name', { length: 255 }),
	responseDate: date('response_date'),
	averageRating: numeric('average_rating'),
	averageTrueResponsePercentage: numeric('average_true_response_percentage')
}).as(
	sql`SELECT r.survey_id, q.category_id, c.name AS category_name, date(r.created_at) AS response_date, avg(a.answer_rating) AS average_rating, avg( CASE WHEN a.answer_boolean IS TRUE THEN 1 ELSE 0 END) * 100::numeric AS average_true_response_percentage FROM responses r JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id GROUP BY r.survey_id, q.category_id, c.name, (date(r.created_at)) ORDER BY (date(r.created_at))`
);

export const responseCounts = pgView('response_counts', {
	surveyId: integer('survey_id'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	responseCount: bigint('response_count', { mode: 'number' })
}).as(
	sql`SELECT survey_id, count(response_id) AS response_count FROM responses GROUP BY survey_id`
);

export const surveyResponseFlat = pgView('survey_response_flat', {
	responseId: integer('response_id'),
	surveyId: integer('survey_id'),
	surveyName: varchar('survey_name', { length: 255 }),
	respondentId: uuid('respondent_id'),
	questionId: integer('question_id'),
	questionText: text('question_text'),
	categoryName: varchar('category_name', { length: 255 }),
	fieldTypeName: varchar('field_type_name', { length: 50 }),
	answerText: text('answer_text'),
	answerRating: integer('answer_rating'),
	answerBoolean: boolean('answer_boolean'),
	answerRadio: text('answer_radio'),
	answerDropdown: varchar('answer_dropdown', { length: 255 }),
	responseDate: timestamp('response_date', { mode: 'string' })
}).as(
	sql`SELECT r.response_id, r.survey_id, s.survey_name, r.respondent_id, q.question_id, q.question_text, c.name AS category_name, ft.field_type_name, a.answer_text, a.answer_rating, a.answer_boolean, a.answer_radio, d.option_text AS answer_dropdown, r.created_at AS response_date FROM responses r JOIN surveys s ON r.survey_id = s.survey_id JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id JOIN field_types ft ON q.field_type_id = ft.field_type_id LEFT JOIN dropdown_options d ON a.answer_dropdown = d.option_id`
);

export const dailyNpsAverages = pgView('daily_nps_averages', {
	surveyId: integer('survey_id'),
	categoryId: integer('category_id'),
	categoryName: varchar('category_name', { length: 255 }),
	responseDate: date('response_date'),
	averageNps: numeric('average_nps')
}).as(
	sql`SELECT r.survey_id, q.category_id, c.name AS category_name, date(r.created_at) AS response_date, avg(a.answer_rating) AS average_nps FROM responses r JOIN answers a ON r.response_id = a.response_id JOIN questions q ON a.question_id = q.question_id JOIN categories c ON q.category_id = c.id JOIN field_types ft ON q.field_type_id = ft.field_type_id WHERE ft.field_type_name::text = 'NPS'::text GROUP BY r.survey_id, q.category_id, c.name, (date(r.created_at)) ORDER BY (date(r.created_at))`
);
