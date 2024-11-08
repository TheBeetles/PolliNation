import json
from geopy.distance import geodesic

# Load GeoJSON data
with open("plant_stores_in_new_york.geojson", "r") as f:
    data = json.load(f)

# Parse the data into a list of stores
stores = [
    {
        "name": feature["properties"].get("name", "Unnamed Store"),
        "lat": feature["geometry"]["coordinates"][1],
        "lon": feature["geometry"]["coordinates"][0],
        "address": feature["properties"].get("addr:street", "Address not available"),
        "url": feature["properties"].get("url")
    }
    for feature in data["features"]
]

# Example user location (replace with actual values if needed)
user_lat = 40.7128  # Example latitude
user_lon = -74.0060  # Example longitude

# Function to calculate distance
def get_distance(user_location, store_location):
    return geodesic(user_location, store_location).kilometers

# Calculate distance for each store
for store in stores:
    store_location = (store["lat"], store["lon"])
    user_location = (user_lat, user_lon)
    store["distance"] = get_distance(user_location, store_location)

# Sort stores by distance and get top 5 nearest stores
nearest_stores = sorted(stores, key=lambda x: x["distance"])[:5]

# Display nearest stores
print("Nearest Plant Stores:")
for store in nearest_stores:
    print(f"Name: {store['name']}")
    print(f"Distance: {store['distance']:.2f} km")
    print(f"Address: {store['address']}")
    if store["url"]:
        print(f"Website: {store['url']}")
    print("---")
