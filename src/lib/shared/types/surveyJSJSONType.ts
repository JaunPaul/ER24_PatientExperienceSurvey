export interface SurveyJSJSONType {
	title: string;
	logo: string;
	logoHeight: string;
	pages: Page[];
	showPageTitles: boolean;
	showProgressBar: boolean;
	progressBarLocation: string;
	autoAdvanceEnabled: boolean;
	firstPageIsStartPage: boolean;
	questionsOnPageMode: string;
	widthMode: string;
}

export interface Page {
	name: string;
	title: string;
	elements: Element[];
}

export type Element =
	| RatingElement
	| CheckboxElement
	| PanelElement
	| CommentElement
	| DropdownElement
	| RadiogroupElement
	| MatrixElement;

export interface RatingElement {
	type: 'rating';
	name: string;
	title: string;
	isRequired?: boolean;
	rateType?: string;
	displayMode?: string;
	autoGenerate?: boolean;
	rateValues?: number[];
	visibleIf?: string;
}

export interface CheckboxElement {
	type: 'checkbox';
	name: string;
	title: string;
	visibleIf?: string;
	choices: Choice[];
}

export interface PanelElement {
	type: 'panel';
	name: string;
	title: string;
	visibleIf?: string;
	description?: string;
	elements: Element[];
}

export interface CommentElement {
	type: 'comment';
	name: string;
	title: string;
	visibleIf?: string;
}

export interface Choice {
	value: string;
	text: string;
}

export interface DropdownElement {
	type: 'dropdown';
	name: string;
	title: string;
	visibleIf?: string;
	choices: string[];
}

export interface RadiogroupElement {
	type: 'radiogroup';
	name: string;
	title: string;
	visibleIf?: string;
	choices: string[];
}

export interface MatrixElement {
	type: 'matrix';
	name: string;
	title: string;
	columns: MatrixColumn[];
	rows: MatrixRow[];
}

export interface MatrixColumn {
	value: number;
	text: string;
}

export interface MatrixRow {
	value: string;
	text: string;
}
