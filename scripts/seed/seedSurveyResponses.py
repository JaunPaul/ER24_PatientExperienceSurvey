import json
import random
import requests
from datetime import datetime, timedelta
import logging
import random

comments = [
    "The experience was great overall",
    "I wish there was more parking",
    "No comment",
    "The staff were friendly",
    "I could never find anyone to help me",
    "The pricing is too high",
    "I had a bad experience here"
]

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load the JSON file
try:
    with open('D:\\Git Repositories\\JaunPaul\\PatientExperienceSurvey\\src\\lib\\survey\\pes.json', 'r') as file:
        survey_data = json.load(file)
except Exception as e:
    logging.error(f"Error loading JSON file: {e}")
    exit(1)

# Function to generate a random response based on the survey JSON structure
def generate_response(survey_data, current_date):
    response = {'createdAt': current_date.isoformat()}
    for page in survey_data['pages']:
        for question in page['questions']:
            if question['type'] in ['radiogroup', 'dropdown']:
                response[question['name']] = random.choice(question['choices'])
            elif question['type'] == 'rating':
                if 'rateValues' in question:
                    response[question['name']] = random.choice(question['rateValues'])
                else:
                    logging.warning(f"Question {question['name']} of type 'rating' does not have 'rateValues'")
                    response[question['name']] = None
            elif question['type'] == 'comment':
                response[question['name']] = random.choice(comments)
            elif question['type'] == 'comment':
                response[question['name']] = "Sample comment"
            elif question['name'] == 'recommendFacility':
                response[question['name']] = random.randint(0, 10)
            elif question['type'] == 'matrix':
                response[question['name']] = {row['value']: random.choice(question['columns'])['value'] for row in question['rows']}
    return response

# Function to send the response to the API
def send_response(response):
    url = 'http://localhost:5173/api/survey'
    headers = {'Content-Type': 'application/json'}
    try:
        api_response = requests.post(url, headers=headers, data=json.dumps(response))
        api_response.raise_for_status()
        return api_response
    except requests.exceptions.RequestException as e:
        logging.error(f"Error sending response: {e}")
        return None

# Main function to generate and send responses
def main(start_date, end_date, responses_per_day):
    current_date = start_date
    while current_date <= end_date:
        for _ in range(responses_per_day):
            response = generate_response(survey_data, current_date)
            api_response = send_response(response)
            if api_response:
                logging.info(f"Sent response for {current_date}: {api_response.status_code}")
        current_date += timedelta(days=1)

if __name__ == "__main__":
    start_date = datetime.strptime('2025-01-31', '%Y-%m-%d')
    end_date = datetime.strptime('2025-02-20', '%Y-%m-%d')
    responses_per_day = 5
    main(start_date, end_date, responses_per_day)