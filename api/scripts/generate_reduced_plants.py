"""
This script checks which plants from a U.S database of plants is present in the nature-id plant labelmap file,
and retains only those matching plants; i.e, limits plant labelmap file to only plants that can be found in the United States
"""

import pandas as pd

# File paths
plants_list_path = r"C:\SDD\us_plant_list.csv"  
input_labelmap_path = r"C:\SDD\PolliNation\api\classifiers\aiy_plants_V1_labelmap.csv"  
output_file_path = r"C:\SDD\PolliNation\api\scripts\reduced_plants_labelmap.csv"  # Output file to be created

"""
Cleans and extracts the core scientific name based on the following:
    - Skip the name if it contains square brackets anywhere in the entry
    - Otherwise, retain only the first two words
"""
def clean_scientific_name(name):
    # Skip entries with square brackets
    if "[" in name:
        return None
    # Split the name into all its words, then just take the first two
    words = name.split()
    if len(words) >= 2:
        return " ".join(words[:2]) # Join the first two words from the list, separated by a space
    elif len(words) > 0:  # In case there's only one word, simply return that word
        return words[0]
    else:
        return None  # Empty or invalid entry
    
# Load the input plants csv file and extract the scientific names column
plants_list = pd.read_csv(plants_list_path)
# Clean and store the scientific names in a new column in the dataframe
plants_list["Cleaned Scientific Name"] = plants_list["Scientific Name"].dropna().apply(clean_scientific_name)
# Convert scientific names to lowercase list
scientific_names = plants_list["Cleaned Scientific Name"].dropna().str.lower().tolist() 

# Load the labelmap CSV file
input_labelmap = pd.read_csv(input_labelmap_path)

# Extract the scientific name from the "name" column of og labelmap, lowercase the name and add to a new lowercased name column in the dataframe
input_labelmap["name_lower"] = input_labelmap["name"].str.lower()  

# Filter rows where the "name" matches a scientific name from the Excel file
reduced_labelmap = input_labelmap[input_labelmap["name_lower"].isin(scientific_names)] # Writes every row of input_labelmap where .isin() has the value True
reduced_labelmap = reduced_labelmap.drop(columns=["name_lower"]) # Remove the name_lower column


# Save the reduced labelmap to new/output CSV file
reduced_labelmap.to_csv(output_file_path, index=False)
