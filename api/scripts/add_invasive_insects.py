import requests
from bs4 import BeautifulSoup
import pandas as pd

# File paths
original_labelmap_path = r"C:\SDD\PolliNation\api\classifiers\aiy_insects_V1_labelmap.csv"
reduced_labelmap_path = r"C:\SDD\PolliNation\api\scripts\reduced_insects_labelmap.csv"

# Scrape invasive insect list from website
def scrape_invasive_insects():
    url = "https://cisr.ucr.edu/invasive-species/scientific-names"
    response = requests.get(url)
    response.raise_for_status()  # Ensure the request was successful
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Find all <em> tags within <li> elements (as this is where each scientific name is stored)
    invasive_insects = soup.select("ul li em")
    
    # Extract, clean, and return the scientific names- get only the name preceding the comma and strip of white sp
    def clean_name(name):
        words = name.split()
        # Return only the first two words of scientific name
        if len(words) >= 2:
            return " ".join(words[:2])
        elif words: # Case where only one word
            return words[0]
        else: # Empty or invalid
            return None
        
    invasive_scientific_names = [clean_name(insect.text) for insect in invasive_insects]
    return invasive_scientific_names

# Load the labelmaps
original_labelmap = pd.read_csv(original_labelmap_path)
reduced_labelmap = pd.read_csv(reduced_labelmap_path)

# Step 3: Check and update reduced labelmap
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
    return updated_labelmap

invasive_insects = scrape_invasive_insects()
updated_labelmap = update_reduced_labelmap(original_labelmap, reduced_labelmap, invasive_insects)
updated_labelmap.drop(columns=["name_lower"], errors="ignore").to_csv(reduced_labelmap_path, index=False)