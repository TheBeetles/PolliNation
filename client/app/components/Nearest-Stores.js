import React, { useState } from "react";

function NearestStores() {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  // Function to get user's location and fetch nearest stores
  const fetchNearestStores = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Send location to the backend
          fetch("/get_nearest_stores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              setStores(data); // Set the nearest stores data
              setError(null); // Clear any previous errors
            })
            .catch((err) => {
              console.error("Error fetching nearest stores:", err);
              setError("Could not fetch nearest stores. Please try again.");
            });
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location permission denied. Please enable it to find nearby stores.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h2>Find the Nearest Plant Stores</h2>
      <button onClick={fetchNearestStores}>Get My Location</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {stores.length > 0 && (
        <div>
          <h3>Nearest Plant Stores:</h3>
          <ul>
            {stores.map((store, index) => (
              <li key={index}>
                <strong>Name:</strong> {store.name} <br />
                <strong>Distance:</strong> {store.distance.toFixed(2)} km <br />
                <strong>Address:</strong> {store.address} <br />
                {store.url && (
                  <span>
                    <strong>Website:</strong> <a href={store.url} target="_blank" rel="noopener noreferrer">{store.url}</a>
                  </span>
                )}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NearestStores;
