export interface FacilityCleanliness {
	rooms?: number;
	bathrooms?: number;
	commonAreas?: number;
}

interface BaseResponse {
	createdAt?: string;
	ageGroup?: string;
	gender?: string;
}

export interface SurveyResponse extends BaseResponse {
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
