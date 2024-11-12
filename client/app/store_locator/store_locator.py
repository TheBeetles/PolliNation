from flask import Flask, request, jsonify
import json
from geopy.distance import geodesic
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load GeoJSON data once at startup
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

# Endpoint to get nearest stores
@app.route('/get_nearest_stores', methods=['POST'])
def get_nearest_stores():
    try:
        user_data = request.json
        latitude = user_data.get('latitude')
        longitude = user_data.get('longitude')

        # Validate the input
        if latitude is None or longitude is None:
            return jsonify({"error": "Latitude and Longitude are required"}), 400

        user_location = (latitude, longitude)

      
        # Function to calculate distance in miles
        def get_distance(user_location, store_location):
            # Calculate distance in kilometers
            distance_km = geodesic(user_location, store_location).kilometers
            # Convert distance to miles
            distance_miles = distance_km * 0.621371
            return distance_miles


        # Calculate distance for each store
        for store in stores:
            store_location = (store["lat"], store["lon"])
            store["distance"] = get_distance(user_location, store_location)

        # Sort stores by distance and get top 5 nearest stores
        nearest_stores = sorted(stores, key=lambda x: x["distance"])[:5]

        # Return nearest stores as JSON
        return jsonify(nearest_stores)

    except Exception as e:
        # Log the error for better visibility
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
