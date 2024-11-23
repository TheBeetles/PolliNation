import os
import asyncio
import csv
from openai import AsyncOpenAI

aclient = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
import json

# Load API key from environment variable

# Input file paths for the insect and plant labelmaps
insect_labelmap_file = r"C:/SDD/PolliNation/api/classifiers/aiy_insects_V1_labelmap.csv"
plant_labelmap_file = r"C:/SDD/PolliNation/api/classifiers/aiy_plants_V1_labelmap.csv"

# Output file paths for the generated JSON files
insects_output_file = r"C:/SDD/PolliNation/api/data/auto_insects.json"
plants_output_file = r"C:/SDD/PolliNation/api/data/auto_plants.json"

# Function to read a labelmap CSV file and extract species names, returns list of species names from labelmap
def read_labelmap(labelmap_file):
    with open(labelmap_file, "r") as file:
        reader = csv.DictReader(file)
        # Collect names, ignore "background" entry
        species = [row["name"] for row in reader if row["name"] != "background"]
    return species

# Function to query ChatGPT API for the species information, returns string response
async def get_species_info(name):
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
        # Await the async OpenAI API call
        response = await aclient.chat.completions.create(model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a knowledgeable biologist."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7)
        # Return the content of the response
        return response.choices[0].message.content
    except Exception as e:
        # Print any error and return None
        print(f"Error fetching data for {name}: {e}")
        return None

# Function to parse the ChatGPT response into a structured JSON-compatible format
# Returns parsed species information as a dictionary
def parse_species_info(name, cgpt_response):
    try:
        # Split the raw response into lines and extract key data
        lines = cgpt_response.split("\n")
        scientific = lines[0].split(":")[1].strip()
        description = lines[1].split(":")[1].strip()
        native = lines[2].split(":")[1].strip().lower() == "true"
        living = lines[3].split(":")[1].strip()
        future = lines[4].split(":")[1].strip()
        # Return the data in the desired format
        return {
            name: {
                "scientific": scientific,
                "description": description,
                "native": native,
                "living": living,
                "future": future,
            }
        }
    except Exception as e:
        # Print an error message if parsing fails
        print(f"Error parsing data for {name}: {e}")
        return None

# Main function to process a labelmap and generate JSON file with species information
# labelmap_file (str): Path to the labelmap CSV file; output_file (str): Path to save the generated JSON file
async def process_labelmap(labelmap_file, output_file):
    # Read species names from the labelmap
    species_list = read_labelmap(labelmap_file)
    species_data = {}

    # Loop through each species name and query ChatGPT
    for species in species_list:
        print(f"Fetching data for: {species}")  # Log progress
        cgpt_response = await get_species_info(species)  # Get raw data from ChatGPT
        if cgpt_response:
            # Parse the data into JSON format
            parsed_data = parse_species_info(species, cgpt_response)
            if parsed_data:
                # Update the overall dictionary with parsed data
                species_data.update(parsed_data)

    # Save the final data to a JSON file
    with open(output_file, "w") as json_file:
        json.dump(species_data, json_file, indent=4)
    print(f"Data saved to {output_file}")  # Log completion

# Run the async tasks for insects and plants
async def main():
    await asyncio.gather(
        process_labelmap(insect_labelmap_file, insects_output_file),
        process_labelmap(plant_labelmap_file, plants_output_file),
    )

# Start the asyncio event loop
if __name__ == "__main__":
    asyncio.run(main())