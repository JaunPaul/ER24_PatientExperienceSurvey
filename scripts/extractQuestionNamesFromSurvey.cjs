"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// Define the path to the JSON file
var jsonFilePath = path.resolve(__dirname, '../src/lib/survey/pes_conditionals.json');
// Read and parse the JSON file
var surveyData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
// Define a function to map types
function mapType(type) {
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
var pages = surveyData.pages || [];
// Initialize the interface object
var interfaceObject = {};
// Function to process elements recursively
function processElements(elements) {
    elements.forEach(function (element) {
        if (element.type === 'panel' && Array.isArray(element.elements)) {
            processElements(element.elements); // Recursively process nested elements
        }
        else if (element.type === 'matrix' && Array.isArray(element.rows)) {
            interfaceObject[element.name] = element.rows.reduce(function (acc, row) {
                acc[row.value] = mapType(element.type);
                return acc;
            }, {});
        }
        else if (element.name && element.type) {
            interfaceObject[element.name] = mapType(element.type);
        }
    });
}
// Loop through each page and process its elements
pages.forEach(function (page) {
    if (Array.isArray(page.elements)) {
        processElements(page.elements);
    }
});
// Generate the TypeScript interface
var interfaceName = 'SurveyInterface';
var interfaceLines = ["export interface ".concat(interfaceName, " {")];
for (var _i = 0, _a = Object.entries(interfaceObject); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    interfaceLines.push("  ".concat(key, "?: ").concat(value, ";"));
}
interfaceLines.push('}');
// Write the interface to a TypeScript file
var outputFilePath = path.resolve(__dirname, 'surveyInterface.ts');
fs.writeFileSync(outputFilePath, interfaceLines.join('\n'), 'utf-8');
console.log("Interface generated and saved to ".concat(outputFilePath));
