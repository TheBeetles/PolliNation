"""
The reduced list of plants is still far too large to successfully make API calls with for every species, and also lacks invasives.
This script is to identify any plants in nature-id's reduced labelmap that fall under the category of the United State's most invasive
plants. For whatever number remains until 200, it will then randomly select that amount of native plants from the reduced labelmap to produce a
labelmap of 200 plant species. The limit of 200 is being placed as that is the approximate amount of insects produced from 
having done this process on the insect labelmap, thus establishing evenness amongs the plant and insect categories.
"""
import requests
from bs4 import BeautifulSoup
import pandas as pd

# List of URLs to scrape- only two relevant pages on website
urls = [
    "https://www.invasivespeciesinfo.gov/terrestrial/plants?page=0",
    "https://www.invasivespeciesinfo.gov/terrestrial/plants?page=1"
]

# Function to extract scientific names from a single page
def extract_scientific_names(url):
    response = requests.get(url)
    response.raise_for_status()  # Ensure the request was successful
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Locate the <em> tags inside the <div> structure corresponding to each scientific name
    plant_items = soup.select("div.usa-card__body div.field--name-species-profile-scientific-name em")
    
    # Extract and return the scientific names
    scientific_names = [item.text.strip() for item in plant_items]
    return scientific_names

# List to store all scientific names of invasive species
all_scientific_names = []

# Scrape each hardcoded URL
for url in urls:
    names = extract_scientific_names(url)
    all_scientific_names.extend(names)

# Save the names to a file
output_file = "invasive_plant_species.txt"
with open(output_file, "w") as f:
    for name in all_scientific_names:
        f.write(name + "\n")

print(f"Scientific names saved to {output_file}")

# Load files
og_labelmap_path = r"C:\SDD\PolliNation\api\classifiers\aiy_plants_V1_labelmap.csv"  
original_labelmap = pd.read_csv(og_labelmap_path)
reduced_labelmap_path = r"C:\SDD\PolliNation\api\scripts\reduced_plants_labelmap.csv"
reduced_labelmap = pd.read_csv(reduced_labelmap_path)

# Check and update reduced labelmap
def update_reduced_labelmap(original_labelmap, reduced_labelmap, invasive_names):
    # Lowercase the scientific names for case-insensitive comparison
    original_labelmap["name_lower"] = original_labelmap["name"].str.lower()
    reduced_labelmap["name_lower"] = reduced_labelmap["name"].str.lower()
    
    # Find matches between invasive names and the original labelmap
    matches = original_labelmap[original_labelmap["name_lower"].isin([name.lower() for name in invasive_names])]
    
    # Exclude names already in the reduced labelmap
    new_entries = matches[~matches["name_lower"].isin(reduced_labelmap["name_lower"])]
    
    # Append the new entries to the reduced labelmap and drop unnecessary columns
    updated_labelmap = pd.concat([reduced_labelmap, new_entries.drop(columns=["name_lower"])], ignore_index=True)
    return updated_labelmap, matches

updated_labelmap, matches = update_reduced_labelmap(original_labelmap, reduced_labelmap, all_scientific_names)

# Now that we've ensured invasives are gathered and on the updated labelmap, randomly select the non-invasives:

# Calculate how many more plants are needed to reach 200
additional_needed = 200 - len(matches)

# Exclude invasive plants from the reduced labelmap
non_invasive_plants = reduced_labelmap[~reduced_labelmap["name_lower"].isin(matches)]

if additional_needed > 0:
    native_sample = non_invasive_plants.sample(n=additional_needed, random_state=42)
else:
    native_sample = pd.DataFrame()  # No additional plants needed

print(f"Randomly selected {len(native_sample)} native plants.")

# Combine the invasive matches and the native sample into one dataframe
final_labelmap = pd.concat([matches, native_sample], ignore_index=True)

# Convert combined/final dataframe into a csv file, written to reduced_labelmap_path to overwrite original contents
final_labelmap.drop(columns=["name_lower"], errors="ignore").to_csv(reduced_labelmap_path, index=False)