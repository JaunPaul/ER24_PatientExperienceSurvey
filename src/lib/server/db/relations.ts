import { relations } from 'drizzle-orm/relations';
import {
	categories,
	questions,
	fieldTypes,
	surveys,
	responses,
	dropdownOptions,
	answers,
	questionsMap,
	directusUsers,
	directusNotifications,
	directusCollections,
	directusShares,
	directusRoles,
	directusFlows,
	directusFolders,
	directusFiles,
	directusPolicies,
	directusPermissions,
	directusActivity,
	directusRevisions,
	directusVersions,
	directusSessions,
	directusPresets,
	directusDashboards,
	directusPanels,
	directusOperations,
	directusAccess,
	directusComments,
	directusWebhooks,
	directusSettings,
	clinicalDepartmentDailyReport,
	dailyPatientReport,
	omnisolPatients,
	omnisolAddresses,
	omnisolAdmissions,
	omnisolVisitations,
	omnisolMedicalAid,
	omnisolPayments,
	omnisolReferrals,
	omnisolDiagnoses,
	omnisolSurveysSent
} from './schema';

export const questionsRelations = relations(questions, ({ one, many }) => ({
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
	questionsMaps: many(questionsMap)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	questions: many(questions)
}));

export const fieldTypesRelations = relations(fieldTypes, ({ many }) => ({
	questions: many(questions)
}));

export const surveysRelations = relations(surveys, ({ many }) => ({
	questions: many(questions),
	responses: many(responses),
	questionsMaps: many(questionsMap)
}));

export const responsesRelations = relations(responses, ({ one, many }) => ({
	survey: one(surveys, {
		fields: [responses.surveyId],
		references: [surveys.surveyId]
	}),
	answers: many(answers),
	omnisolSurveysSents: many(omnisolSurveysSent)
}));

export const answersRelations = relations(answers, ({ one }) => ({
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
	})
}));

export const dropdownOptionsRelations = relations(dropdownOptions, ({ one, many }) => ({
	answers: many(answers),
	question: one(questions, {
		fields: [dropdownOptions.questionId],
		references: [questions.questionId]
	})
}));

export const questionsMapRelations = relations(questionsMap, ({ one }) => ({
	survey: one(surveys, {
		fields: [questionsMap.surveyId],
		references: [surveys.surveyId]
	}),
	question: one(questions, {
		fields: [questionsMap.questionId],
		references: [questions.questionId]
	})
}));

export const directusNotificationsRelations = relations(directusNotifications, ({ one }) => ({
	directusUser_recipient: one(directusUsers, {
		fields: [directusNotifications.recipient],
		references: [directusUsers.id],
		relationName: 'directusNotifications_recipient_directusUsers_id'
	}),
	directusUser_sender: one(directusUsers, {
		fields: [directusNotifications.sender],
		references: [directusUsers.id],
		relationName: 'directusNotifications_sender_directusUsers_id'
	})
}));

export const directusUsersRelations = relations(directusUsers, ({ one, many }) => ({
	directusNotifications_recipient: many(directusNotifications, {
		relationName: 'directusNotifications_recipient_directusUsers_id'
	}),
	directusNotifications_sender: many(directusNotifications, {
		relationName: 'directusNotifications_sender_directusUsers_id'
	}),
	directusShares: many(directusShares),
	directusFlows: many(directusFlows),
	directusFiles_modifiedBy: many(directusFiles, {
		relationName: 'directusFiles_modifiedBy_directusUsers_id'
	}),
	directusFiles_uploadedBy: many(directusFiles, {
		relationName: 'directusFiles_uploadedBy_directusUsers_id'
	}),
	directusRole: one(directusRoles, {
		fields: [directusUsers.role],
		references: [directusRoles.id]
	}),
	directusSessions: many(directusSessions),
	directusPresets: many(directusPresets),
	directusPanels: many(directusPanels),
	directusDashboards: many(directusDashboards),
	directusOperations: many(directusOperations),
	directusAccesses: many(directusAccess),
	directusComments_userCreated: many(directusComments, {
		relationName: 'directusComments_userCreated_directusUsers_id'
	}),
	directusComments_userUpdated: many(directusComments, {
		relationName: 'directusComments_userUpdated_directusUsers_id'
	}),
	directusVersions_userCreated: many(directusVersions, {
		relationName: 'directusVersions_userCreated_directusUsers_id'
	}),
	directusVersions_userUpdated: many(directusVersions, {
		relationName: 'directusVersions_userUpdated_directusUsers_id'
	}),
	clinicalDepartmentDailyReports_userCreated: many(clinicalDepartmentDailyReport, {
		relationName: 'clinicalDepartmentDailyReport_userCreated_directusUsers_id'
	}),
	clinicalDepartmentDailyReports_userUpdated: many(clinicalDepartmentDailyReport, {
		relationName: 'clinicalDepartmentDailyReport_userUpdated_directusUsers_id'
	}),
	dailyPatientReports_userCreated: many(dailyPatientReport, {
		relationName: 'dailyPatientReport_userCreated_directusUsers_id'
	}),
	dailyPatientReports_userUpdated: many(dailyPatientReport, {
		relationName: 'dailyPatientReport_userUpdated_directusUsers_id'
	})
}));

export const directusSharesRelations = relations(directusShares, ({ one, many }) => ({
	directusCollection: one(directusCollections, {
		fields: [directusShares.collection],
		references: [directusCollections.collection]
	}),
	directusRole: one(directusRoles, {
		fields: [directusShares.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusShares.userCreated],
		references: [directusUsers.id]
	}),
	directusSessions: many(directusSessions)
}));

export const directusCollectionsRelations = relations(directusCollections, ({ one, many }) => ({
	directusShares: many(directusShares),
	directusCollection: one(directusCollections, {
		fields: [directusCollections.group],
		references: [directusCollections.collection],
		relationName: 'directusCollections_group_directusCollections_collection'
	}),
	directusCollections: many(directusCollections, {
		relationName: 'directusCollections_group_directusCollections_collection'
	}),
	directusVersions: many(directusVersions)
}));

export const directusRolesRelations = relations(directusRoles, ({ one, many }) => ({
	directusShares: many(directusShares),
	directusRole: one(directusRoles, {
		fields: [directusRoles.parent],
		references: [directusRoles.id],
		relationName: 'directusRoles_parent_directusRoles_id'
	}),
	directusRoles: many(directusRoles, {
		relationName: 'directusRoles_parent_directusRoles_id'
	}),
	directusUsers: many(directusUsers),
	directusPresets: many(directusPresets),
	directusAccesses: many(directusAccess),
	directusSettings: many(directusSettings)
}));

export const directusFlowsRelations = relations(directusFlows, ({ one, many }) => ({
	directusUser: one(directusUsers, {
		fields: [directusFlows.userCreated],
		references: [directusUsers.id]
	}),
	directusOperations: many(directusOperations),
	directusWebhooks: many(directusWebhooks)
}));

export const directusFilesRelations = relations(directusFiles, ({ one, many }) => ({
	directusFolder: one(directusFolders, {
		fields: [directusFiles.folder],
		references: [directusFolders.id]
	}),
	directusUser_modifiedBy: one(directusUsers, {
		fields: [directusFiles.modifiedBy],
		references: [directusUsers.id],
		relationName: 'directusFiles_modifiedBy_directusUsers_id'
	}),
	directusUser_uploadedBy: one(directusUsers, {
		fields: [directusFiles.uploadedBy],
		references: [directusUsers.id],
		relationName: 'directusFiles_uploadedBy_directusUsers_id'
	}),
	directusSettings_projectLogo: many(directusSettings, {
		relationName: 'directusSettings_projectLogo_directusFiles_id'
	}),
	directusSettings_publicBackground: many(directusSettings, {
		relationName: 'directusSettings_publicBackground_directusFiles_id'
	}),
	directusSettings_publicFavicon: many(directusSettings, {
		relationName: 'directusSettings_publicFavicon_directusFiles_id'
	}),
	directusSettings_publicForeground: many(directusSettings, {
		relationName: 'directusSettings_publicForeground_directusFiles_id'
	})
}));

export const directusFoldersRelations = relations(directusFolders, ({ one, many }) => ({
	directusFiles: many(directusFiles),
	directusFolder: one(directusFolders, {
		fields: [directusFolders.parent],
		references: [directusFolders.id],
		relationName: 'directusFolders_parent_directusFolders_id'
	}),
	directusFolders: many(directusFolders, {
		relationName: 'directusFolders_parent_directusFolders_id'
	}),
	directusSettings: many(directusSettings)
}));

export const directusPermissionsRelations = relations(directusPermissions, ({ one }) => ({
	directusPolicy: one(directusPolicies, {
		fields: [directusPermissions.policy],
		references: [directusPolicies.id]
	})
}));

export const directusPoliciesRelations = relations(directusPolicies, ({ many }) => ({
	directusPermissions: many(directusPermissions),
	directusAccesses: many(directusAccess)
}));

export const directusRevisionsRelations = relations(directusRevisions, ({ one, many }) => ({
	directusActivity: one(directusActivity, {
		fields: [directusRevisions.activity],
		references: [directusActivity.id]
	}),
	directusRevision: one(directusRevisions, {
		fields: [directusRevisions.parent],
		references: [directusRevisions.id],
		relationName: 'directusRevisions_parent_directusRevisions_id'
	}),
	directusRevisions: many(directusRevisions, {
		relationName: 'directusRevisions_parent_directusRevisions_id'
	}),
	directusVersion: one(directusVersions, {
		fields: [directusRevisions.version],
		references: [directusVersions.id]
	})
}));

export const directusActivityRelations = relations(directusActivity, ({ many }) => ({
	directusRevisions: many(directusRevisions)
}));

export const directusVersionsRelations = relations(directusVersions, ({ one, many }) => ({
	directusRevisions: many(directusRevisions),
	directusCollection: one(directusCollections, {
		fields: [directusVersions.collection],
		references: [directusCollections.collection]
	}),
	directusUser_userCreated: one(directusUsers, {
		fields: [directusVersions.userCreated],
		references: [directusUsers.id],
		relationName: 'directusVersions_userCreated_directusUsers_id'
	}),
	directusUser_userUpdated: one(directusUsers, {
		fields: [directusVersions.userUpdated],
		references: [directusUsers.id],
		relationName: 'directusVersions_userUpdated_directusUsers_id'
	})
}));

export const directusSessionsRelations = relations(directusSessions, ({ one }) => ({
	directusShare: one(directusShares, {
		fields: [directusSessions.share],
		references: [directusShares.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusSessions.user],
		references: [directusUsers.id]
	})
}));

export const directusPresetsRelations = relations(directusPresets, ({ one }) => ({
	directusRole: one(directusRoles, {
		fields: [directusPresets.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusPresets.user],
		references: [directusUsers.id]
	})
}));

export const directusPanelsRelations = relations(directusPanels, ({ one }) => ({
	directusDashboard: one(directusDashboards, {
		fields: [directusPanels.dashboard],
		references: [directusDashboards.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusPanels.userCreated],
		references: [directusUsers.id]
	})
}));

export const directusDashboardsRelations = relations(directusDashboards, ({ one, many }) => ({
	directusPanels: many(directusPanels),
	directusUser: one(directusUsers, {
		fields: [directusDashboards.userCreated],
		references: [directusUsers.id]
	})
}));

export const directusOperationsRelations = relations(directusOperations, ({ one, many }) => ({
	directusFlow: one(directusFlows, {
		fields: [directusOperations.flow],
		references: [directusFlows.id]
	}),
	directusOperation_reject: one(directusOperations, {
		fields: [directusOperations.reject],
		references: [directusOperations.id],
		relationName: 'directusOperations_reject_directusOperations_id'
	}),
	directusOperations_reject: many(directusOperations, {
		relationName: 'directusOperations_reject_directusOperations_id'
	}),
	directusOperation_resolve: one(directusOperations, {
		fields: [directusOperations.resolve],
		references: [directusOperations.id],
		relationName: 'directusOperations_resolve_directusOperations_id'
	}),
	directusOperations_resolve: many(directusOperations, {
		relationName: 'directusOperations_resolve_directusOperations_id'
	}),
	directusUser: one(directusUsers, {
		fields: [directusOperations.userCreated],
		references: [directusUsers.id]
	})
}));

export const directusAccessRelations = relations(directusAccess, ({ one }) => ({
	directusPolicy: one(directusPolicies, {
		fields: [directusAccess.policy],
		references: [directusPolicies.id]
	}),
	directusRole: one(directusRoles, {
		fields: [directusAccess.role],
		references: [directusRoles.id]
	}),
	directusUser: one(directusUsers, {
		fields: [directusAccess.user],
		references: [directusUsers.id]
	})
}));

export const directusCommentsRelations = relations(directusComments, ({ one }) => ({
	directusUser_userCreated: one(directusUsers, {
		fields: [directusComments.userCreated],
		references: [directusUsers.id],
		relationName: 'directusComments_userCreated_directusUsers_id'
	}),
	directusUser_userUpdated: one(directusUsers, {
		fields: [directusComments.userUpdated],
		references: [directusUsers.id],
		relationName: 'directusComments_userUpdated_directusUsers_id'
	})
}));

export const directusWebhooksRelations = relations(directusWebhooks, ({ one }) => ({
	directusFlow: one(directusFlows, {
		fields: [directusWebhooks.migratedFlow],
		references: [directusFlows.id]
	})
}));

export const directusSettingsRelations = relations(directusSettings, ({ one }) => ({
	directusFile_projectLogo: one(directusFiles, {
		fields: [directusSettings.projectLogo],
		references: [directusFiles.id],
		relationName: 'directusSettings_projectLogo_directusFiles_id'
	}),
	directusFile_publicBackground: one(directusFiles, {
		fields: [directusSettings.publicBackground],
		references: [directusFiles.id],
		relationName: 'directusSettings_publicBackground_directusFiles_id'
	}),
	directusFile_publicFavicon: one(directusFiles, {
		fields: [directusSettings.publicFavicon],
		references: [directusFiles.id],
		relationName: 'directusSettings_publicFavicon_directusFiles_id'
	}),
	directusFile_publicForeground: one(directusFiles, {
		fields: [directusSettings.publicForeground],
		references: [directusFiles.id],
		relationName: 'directusSettings_publicForeground_directusFiles_id'
	}),
	directusRole: one(directusRoles, {
		fields: [directusSettings.publicRegistrationRole],
		references: [directusRoles.id]
	}),
	directusFolder: one(directusFolders, {
		fields: [directusSettings.storageDefaultFolder],
		references: [directusFolders.id]
	})
}));

export const clinicalDepartmentDailyReportRelations = relations(
	clinicalDepartmentDailyReport,
	({ one }) => ({
		directusUser_userCreated: one(directusUsers, {
			fields: [clinicalDepartmentDailyReport.userCreated],
			references: [directusUsers.id],
			relationName: 'clinicalDepartmentDailyReport_userCreated_directusUsers_id'
		}),
		directusUser_userUpdated: one(directusUsers, {
			fields: [clinicalDepartmentDailyReport.userUpdated],
			references: [directusUsers.id],
			relationName: 'clinicalDepartmentDailyReport_userUpdated_directusUsers_id'
		})
	})
);

export const dailyPatientReportRelations = relations(dailyPatientReport, ({ one }) => ({
	directusUser_userCreated: one(directusUsers, {
		fields: [dailyPatientReport.userCreated],
		references: [directusUsers.id],
		relationName: 'dailyPatientReport_userCreated_directusUsers_id'
	}),
	directusUser_userUpdated: one(directusUsers, {
		fields: [dailyPatientReport.userUpdated],
		references: [directusUsers.id],
		relationName: 'dailyPatientReport_userUpdated_directusUsers_id'
	})
}));

export const omnisolAddressesRelations = relations(omnisolAddresses, ({ one }) => ({
	omnisolPatient: one(omnisolPatients, {
		fields: [omnisolAddresses.patientId],
		references: [omnisolPatients.patientId]
	})
}));

export const omnisolPatientsRelations = relations(omnisolPatients, ({ many }) => ({
	omnisolAddresses: many(omnisolAddresses),
	omnisolVisitations: many(omnisolVisitations),
	omnisolSurveysSents: many(omnisolSurveysSent)
}));

export const omnisolVisitationsRelations = relations(omnisolVisitations, ({ one, many }) => ({
	omnisolAdmission: one(omnisolAdmissions, {
		fields: [omnisolVisitations.admissionId],
		references: [omnisolAdmissions.id],
		relationName: 'omnisolVisitations_admissionId_omnisolAdmissions_id'
	}),
	omnisolMedicalAid: one(omnisolMedicalAid, {
		fields: [omnisolVisitations.medicalAidId],
		references: [omnisolMedicalAid.id],
		relationName: 'omnisolVisitations_medicalAidId_omnisolMedicalAid_id'
	}),
	omnisolPatient: one(omnisolPatients, {
		fields: [omnisolVisitations.patientId],
		references: [omnisolPatients.patientId]
	}),
	omnisolPayment: one(omnisolPayments, {
		fields: [omnisolVisitations.paymentId],
		references: [omnisolPayments.id],
		relationName: 'omnisolVisitations_paymentId_omnisolPayments_id'
	}),
	omnisolReferral: one(omnisolReferrals, {
		fields: [omnisolVisitations.referralId],
		references: [omnisolReferrals.id],
		relationName: 'omnisolVisitations_referralId_omnisolReferrals_id'
	}),
	omnisolMedicalAids_visitId: many(omnisolMedicalAid, {
		relationName: 'omnisolMedicalAid_visitId_omnisolVisitations_visitId'
	}),
	omnisolMedicalAids_visitId: many(omnisolMedicalAid, {
		relationName: 'omnisolMedicalAid_visitId_omnisolVisitations_visitId'
	}),
	omnisolAdmissions_visitId: many(omnisolAdmissions, {
		relationName: 'omnisolAdmissions_visitId_omnisolVisitations_visitId'
	}),
	omnisolAdmissions_visitId: many(omnisolAdmissions, {
		relationName: 'omnisolAdmissions_visitId_omnisolVisitations_visitId'
	}),
	omnisolReferrals_visitId: many(omnisolReferrals, {
		relationName: 'omnisolReferrals_visitId_omnisolVisitations_visitId'
	}),
	omnisolReferrals_visitId: many(omnisolReferrals, {
		relationName: 'omnisolReferrals_visitId_omnisolVisitations_visitId'
	}),
	omnisolPayments_visitId: many(omnisolPayments, {
		relationName: 'omnisolPayments_visitId_omnisolVisitations_visitId'
	}),
	omnisolPayments_visitId: many(omnisolPayments, {
		relationName: 'omnisolPayments_visitId_omnisolVisitations_visitId'
	}),
	omnisolDiagnoses_visitId: many(omnisolDiagnoses, {
		relationName: 'omnisolDiagnoses_visitId_omnisolVisitations_visitId'
	}),
	omnisolDiagnoses_visitId: many(omnisolDiagnoses, {
		relationName: 'omnisolDiagnoses_visitId_omnisolVisitations_visitId'
	})
}));

export const omnisolAdmissionsRelations = relations(omnisolAdmissions, ({ one, many }) => ({
	omnisolVisitations: many(omnisolVisitations, {
		relationName: 'omnisolVisitations_admissionId_omnisolAdmissions_id'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolAdmissions.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolAdmissions_visitId_omnisolVisitations_visitId'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolAdmissions.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolAdmissions_visitId_omnisolVisitations_visitId'
	})
}));

export const omnisolMedicalAidRelations = relations(omnisolMedicalAid, ({ one, many }) => ({
	omnisolVisitations: many(omnisolVisitations, {
		relationName: 'omnisolVisitations_medicalAidId_omnisolMedicalAid_id'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolMedicalAid.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolMedicalAid_visitId_omnisolVisitations_visitId'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolMedicalAid.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolMedicalAid_visitId_omnisolVisitations_visitId'
	})
}));

export const omnisolPaymentsRelations = relations(omnisolPayments, ({ one, many }) => ({
	omnisolVisitations: many(omnisolVisitations, {
		relationName: 'omnisolVisitations_paymentId_omnisolPayments_id'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolPayments.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolPayments_visitId_omnisolVisitations_visitId'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolPayments.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolPayments_visitId_omnisolVisitations_visitId'
	})
}));

export const omnisolReferralsRelations = relations(omnisolReferrals, ({ one, many }) => ({
	omnisolVisitations: many(omnisolVisitations, {
		relationName: 'omnisolVisitations_referralId_omnisolReferrals_id'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolReferrals.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolReferrals_visitId_omnisolVisitations_visitId'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolReferrals.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolReferrals_visitId_omnisolVisitations_visitId'
	})
}));

export const omnisolDiagnosesRelations = relations(omnisolDiagnoses, ({ one }) => ({
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolDiagnoses.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolDiagnoses_visitId_omnisolVisitations_visitId'
	}),
	omnisolVisitation_visitId: one(omnisolVisitations, {
		fields: [omnisolDiagnoses.visitId],
		references: [omnisolVisitations.visitId],
		relationName: 'omnisolDiagnoses_visitId_omnisolVisitations_visitId'
	})
}));

export const omnisolSurveysSentRelations = relations(omnisolSurveysSent, ({ one }) => ({
	omnisolPatient: one(omnisolPatients, {
		fields: [omnisolSurveysSent.patientId],
		references: [omnisolPatients.patientId]
	}),
	response: one(responses, {
		fields: [omnisolSurveysSent.responseId],
		references: [responses.responseId]
	})
}));
