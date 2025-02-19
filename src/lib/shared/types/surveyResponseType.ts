export interface FacilityCleanliness {
	rooms?: number;
	bathrooms?: number;
	commonAreas?: number;
}

export interface SurveyResponse {
	gender?: string;
	ageGroup?: string;
	admissionEfficiency?: number;
	admissionStaffHelpfulness?: number;
	insurancePaymentInfo?: string;
	waitingTime?: string;
	facilityCleanliness?: FacilityCleanliness;
	roomComfort?: number;
	noiseLevel?: string;
	doctorCareQuality?: string;
	nursingCareQuality?: string;
	medicalStaffResponse?: string;
	procedureExplanation?: string;
	staffCheck?: string;
	medicationExplanation?: string;
	staffRespect?: string;
	staffListen?: string;
	staffAvailability?: string;
	dischargeInstructions?: string;
	medicationInstructions?: string;
	followUpCare?: string;
	dischargeEfficiency?: string;
	goodAspects?: string;
	areasForImprovement?: string;
	feelSafe?: string;
	createdAt?: string;
}
