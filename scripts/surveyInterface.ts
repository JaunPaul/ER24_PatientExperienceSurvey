export interface SurveyInterface {
	overallExperienceRating?: number;
	aspectContributionOverallRating?: Array<string>;
	admissionEfficiency?: number;
	admissionStaffHelpfulness?: number;
	insurancePaymentInfo?: string;
	waitingTime?: string;
	dischargeInstructions?: string;
	medicationInstructions?: string;
	followUpCare?: string;
	dischargeEfficiency?: string;
	facilityCleanliness?: Record<string, any>;
	roomComfort?: number;
	noiseLevel?: string;
	staffRespect?: string;
	staffListen?: string;
	staffAvailability?: string;
	areasForImprovement?: string;
	medicalCareRating?: number;
	whoProvidedPoorCare?: string;
	nurseStaffResponse?: string;
	nurseCheck?: string;
	procedureExplanation?: string;
	medicationExplanation?: string;
	staffRating?: number;
	staffCheck?: string;
	medicalStaffResponse?: string;
	goodAspects?: string;
}
