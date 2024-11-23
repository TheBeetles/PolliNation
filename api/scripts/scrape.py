import requests
from bs4 import BeautifulSoup
import pandas as pd

# Base URL for Entomological Society's common names database
BASE_URL = "https://www.entsoc.org/publications/common-names"

# Mimic browser request
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}

def scrape_common_names(base_url):
    all_data = [] # Stores all extracted rows from the website
    page_number = 1 # Start at first page of website

    while True:
        # URL for the current page
        url = f"{base_url}?page={page_number}" # Dynamically update the url to fetch data for each page by appending page number
        print(f"Scraping page: {page_number}")
        response = requests.get(url, headers=HEADERS)

        # If the page doesn't exist, break the loop
        if response.status_code != 200:
            print("No more pages to scrape.")
            break

        soup = BeautifulSoup(response.text, "html.parser") # Pass in HTML content (response.txt) into BeautifulSoup for parsing
        
        # Locate the table containing data
        table = soup.find("table") # Locate first table element in the HTML
        if not table:
            print("No table found on this page.")
            break

        # Extract rows from the table
        rows = table.find("tbody").find_all("tr")
        for row in rows:
            columns = row.find_all("td")
            if len(columns) == 3:
                common_name = columns[0].text.strip()
                scientific_name = columns[1].text.strip()
                order = columns[2].text.strip()
                all_data.append([common_name, scientific_name, order])

        # Increment page number for the next iteration
        page_number += 1

    # Convert the scraped data to a DataFrame
    df = pd.DataFrame(all_data, columns=["Common Name", "Scientific Name", "Order"])
    return df

# Scrape the data and save to a CSV
data = scrape_common_names(BASE_URL)
output_file = "entsoc_scraped_names.csv"
data.to_csv(output_file, index=False)
print(f"Data successfully saved to {output_file}")
