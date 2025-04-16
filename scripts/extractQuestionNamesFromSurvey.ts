import * as fs from 'fs';
import * as path from 'path';

// Define the path to the JSON file
const jsonFilePath = path.resolve(__dirname, '../src/lib/survey/pes_conditionals.json');

// Read and parse the JSON file
const surveyData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

// Define a function to map types
function mapType(type: string): string {
	switch (type) {
		case 'rating':
		case 'number':
			return 'number';
		case 'checkbox':
			return 'Array<string>';
		case 'radio':
		case 'radiogroup':
		case 'dropdown':
		case 'string':
			return 'string';
		case 'matrix':
			return 'Record<string,any>';
		default:
			return 'any';
	}
}

// Extract the pages property
const pages = surveyData.pages || [];

// Initialize the interface object
const interfaceObject: Record<string, string> = {};

// Function to process elements recursively
function processElements(elements: any[]) {
	elements.forEach((element) => {
		if (element.type === 'panel' && Array.isArray(element.elements)) {
			processElements(element.elements); // Recursively process nested elements
		} else if (element.type === 'matrix' && Array.isArray(element.rows)) {
			interfaceObject[element.name] = element.rows.reduce(
				(acc: Record<string, string>, row: any) => {
					acc[row.value] = mapType(element.type);
					return acc;
				},
				{}
			);
		} else if (element.name && element.type) {
			interfaceObject[element.name] = mapType(element.type);
		}
	});
}

// Loop through each page and process its elements
pages.forEach((page: any) => {
	if (Array.isArray(page.elements)) {
		processElements(page.elements);
	}
});

// Generate the TypeScript interface
const interfaceName = 'SurveyInterface';
const interfaceLines = [`export interface ${interfaceName} {`];
for (const [key, value] of Object.entries(interfaceObject)) {
	interfaceLines.push(`  ${key}?: ${value};`);
}
interfaceLines.push('}');

// Write the interface to a TypeScript file
const outputFilePath = path.resolve(__dirname, 'surveyInterface.ts');
fs.writeFileSync(outputFilePath, interfaceLines.join('\n'), 'utf-8');

console.log(`Interface generated and saved to ${outputFilePath}`);
