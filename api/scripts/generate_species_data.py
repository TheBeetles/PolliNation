import csv
import openai
import json

# Load API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Input file paths for the insect and plant labelmaps
insect_labelmap_file = "aiy_insects_V1_labelmap.csv"
plant_labelmap_file = "aiy_plants_V1_labelmap.csv"

# Output file paths for the generated JSON files
insects_output_file = "auto_insects.json"
plants_output_file = "auto_plants.json"

# Function to read a labelmap CSV file and extract species names, returns list of species names from labelmap
def read_labelmap(labelmap_file):
    with open(labelmap_file, "r") as file:
        reader = csv.DictReader(file)
        # Collect names, ignore "background" entry
        species = [row["name"] for row in reader if row["name"] != "background"]
    return species

# Function to query ChatGPT API for the species information, returns string response
def get_species_info(name):
    prompt = f"""
    Provide detailed information for the following species: "{name}".
    Include:
    - Scientific name
    - Description
    - Whether it is native (true/false)
    - Preferred living environment
    - Suggestions for future management
    Return the data in plain English.
    """
    try:
        # Query the OpenAI API with a descriptive prompt
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a knowledgeable biologist."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7  # Can be adjusted for more or less randomness in responses
        )
        # Return the content of the response
        return response['choices'][0]['message']['content']
    except Exception as e:
        # Print any error and return None
        print(f"Error fetching data for {name}: {e}")
        return None