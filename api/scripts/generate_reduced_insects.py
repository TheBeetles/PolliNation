import pandas as pd
import re

# File paths
excel_insects_path = r"C:\SDD\insects_list.xlsx"  
input_labelmap_path = r"C:\SDD\PolliNation\api\classifiers\aiy_insects_V1_labelmap.csv"  
output_file_path = r"C:\SDD\PolliNation\api\scripts\reduced_insects_labelmap.csv"  # Output file to be created

# Function to clean the scientific name by removing succeeding text in parentheses
def clean_scientific_name(name):
    return name.split(" (")[0]  # Split at " (" and take only the part before it

# Load the Excel file and extract the scientific names column
excel_data = pd.read_excel(excel_insects_path)
# Clean and store the scientific names in a new column in the dataframe
excel_data["Cleaned Scientific Name"] = excel_data["Scientific Name"].dropna().apply(clean_scientific_name)
# Convert scientific names to lowercase list
scientific_names = excel_data["Cleaned Scientific Name"].dropna().str.lower().tolist() 

# Load the labelmap CSV file
input_labelmap = pd.read_csv(input_labelmap_path)

# Extract the scientific name from the "name" column of og labelmap, lowercase the name and add to a new lowercased name column in the dataframe
input_labelmap["name_lower"] = input_labelmap["name"].str.lower()  

# Filter rows where the "name" matches a scientific name from the Excel file
reduced_labelmap = input_labelmap[input_labelmap["name_lower"].isin(scientific_names)]

# Save the reduced labelmap to new/output CSV file
reduced_labelmap.to_csv(output_file_path, index=False)
