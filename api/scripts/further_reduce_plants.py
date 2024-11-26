"""
The reduced list of plants is still far too large to successfully make API calls with for every species.
This script is to identify any plants in nature-id's reduced labelmap that fall under the category of the United State's most invasive
plants. For whatever number remains until 200, it will then randomly select that amount of native plants from the reduced labelmap to produce a
labelmap of 200 plant species.
"""
import requests
from bs4 import BeautifulSoup

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

# List to store all scientific names
all_scientific_names = []

# Scrape each hardcoded URL
for url in urls:
    names = extract_scientific_names(url)
    all_scientific_names.extend(names)

# Output the results
print("Extracted Scientific Names:")
for name in all_scientific_names:
    print(name)

# Optionally save the names to a file
output_file = "invasive_plant_species.txt"
with open(output_file, "w") as f:
    for name in all_scientific_names:
        f.write(name + "\n")

print(f"Scientific names saved to {output_file}")
