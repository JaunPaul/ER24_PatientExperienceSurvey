export type SurveyJSJSONType = {
	title: string;
	logo: string;
	logoPosition: string;
	pages: Page[];
	showNavigationButtons: string;
	showProgressBar: string;
	progressBarShowPageNumbers: boolean;
	goNextPageAutomatic: boolean;
	widthMode: string;
};

type Page = {
	title: string;
	questions: Question[];
};

type Question =
	| RadioGroupQuestion
	| DropdownQuestion
	| RatingQuestion
	| MatrixQuestion
	| NPSQuestion
	| CommentQuestion
	| BooleanQuestion;

type RadioGroupQuestion = {
	type: 'radiogroup';
	name: string;
	title: string;
	choices: string[];
};

type DropdownQuestion = {
	type: 'dropdown';
	name: string;
	title: string;
	choices: string[];
};

type RatingQuestion = {
	type: 'rating';
	name: string;
	title: string;
	rateValues: number[];
};

type MatrixQuestion = {
	type: 'matrix';
	name: string;
	title: string;
	columns: MatrixColumn[];
	rows: MatrixRow[];
};

type MatrixColumn = {
	value: number;
	text: string;
};

type MatrixRow = {
	value: string;
	text: string;
};

type NPSQuestion = {
	type: 'nps';
	name: string;
	title: string;
	isRequired: boolean;
};

type CommentQuestion = {
	type: 'comment';
	name: string;
	title: string;
};

type BooleanQuestion = {
	type: 'boolean';
	name: string;
	title: string;
};
