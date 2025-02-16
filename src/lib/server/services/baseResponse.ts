export class BaseResponse<T> {
	public success: boolean;
	public message: string;
	public data: T | null;

	constructor(success: boolean, message: string, data: T | null = null) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
}

export interface SuccessType {
	statusCode: number;
	id?: number;
	name?: string;
	description?: string;
	data?: any;
	// Add other fields as needed
}

export interface FailType {
	errorCode: number;
	errorMessage: string;
	// Add other fields as needed
}
