'use client';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import verifyUser from '../../components/verify';
import BackButton from '../../components/BackButton';
import styles from '../../components/Camera.module.css';
import loadingBar from '../../images/loading-bar.png';

export default function SpeciesInformation({ params }) {
  verifyUser();
  const router = useRouter();

  const [speciesData, setSpeciesData] = useState(null); // Species data state
  const [image, setImage] = useState(''); // Image URL state
  const [nearestStores, setNearestStores] = useState([]); // Nearest stores state
  const [locationError, setLocationError] = useState(null); // Location error state
  const route = `/api/image/get/${params.val}`;

  useEffect(() => {
    // Fetch species data
    const fetchSpeciesData = async () => {
      try {
        const res = await fetch(route, { method: 'GET' });
        const blob = await res.blob();
        const objectURL = URL.createObjectURL(blob);
        setImage(objectURL);
      } catch (error) {
        console.error('Error fetching species image:', error);
      }
    };

    // Fetch plant species information
    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/get/image/info/${params.val}`, { method: 'GET' });
        const data = await res.json();
        setSpeciesData(data);
      } catch (error) {
        console.error('Error fetching species data:', error);
      }
    };

    // Request user's location and fetch nearest plant stores
    const fetchNearestStores = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Updated to POST with JSON payload containing latitude and longitude
            const res = await fetch('http://127.0.0.1:5000/get_nearest_stores', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                latitude: latitude,
                longitude: longitude,
              }),
            });
            
            const stores = await res.json();
            if (res.ok) {
              setNearestStores(stores);
            } else {
              setLocationError("Unable to retrieve nearest plant stores.");
            }
          } catch (error) {
            console.error('Error fetching nearest plant stores:', error);
            setLocationError("Unable to retrieve nearest plant stores.");
          }
        }, (error) => {
          setLocationError("Location access denied. Unable to retrieve nearest plant stores.");
          console.error("Error getting location:", error);
        });
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    };

    fetchSpeciesData();
    fetchImage();
    fetchNearestStores();
  }, [params.val]);

  const handleBack = () => {
    router.back();
  };

  const handleRemoveSpecies = async () => {
    const res = await fetch('/api/image/delete', {
      method: 'POST',
      body: JSON.stringify({ id: params.val }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (res.ok) {
      router.back();
    }
  };

  return (
    <>
      <Head>
        <title>Species Information</title>
        <meta name="description" content={`Information about ${speciesData?.name || 'the species'}`} />
      </Head>
      
      {speciesData === null && (
        <div className={styles.container} style={{ height: '97vh', padding: '0' }}>
          <Image src={loadingBar} alt="Loading Bar" width={400} />
        </div>
      )}
      
      {speciesData !== null && (
        <div className="species-container">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <BackButton onClick={handleBack}></BackButton>
            <button onClick={handleRemoveSpecies} className={styles.button}>Remove Species</button>
          </div>
          <header className="header">
            <h1>{speciesData.name || speciesData.scientific || 'Unknown Species'} ({speciesData.percentage})</h1>
            {(speciesData.native !== undefined) && 
              <p>{speciesData.native ? 'Native' : <span className="location">Invasive</span>} Species</p>
            }
          </header>
          <img src={image} alt={speciesData.name} width={800} height={450} className="main-image" />
          
          {speciesData.description ? (
            <div className="content">
              <section className="about">
                <h2>About</h2>
                <p><strong>Scientific Name:</strong> {speciesData.scientific}</p>
                <p>{speciesData.description}</p>
              </section>
              <section className="living-conditions">
                <h2>Living Conditions</h2>
                <p>{speciesData.living}</p>
              </section>
              <section className="future-actions">
                <h2>Future Actions</h2>
                <p>{speciesData.future}</p>
              </section>
            </div>
          ) : (
            <h2>Information not available</h2>
          )}

          {/* Nearest Plant Stores Section */}
          <section className="nearest-stores">
            <h2>Nearest Plant Stores</h2>
            {locationError ? (
              <p>{locationError}</p>
            ) : nearestStores.length > 0 ? (
              nearestStores.map((store, index) => (
                <div key={index} className="store">
                  <h3>{store.name}</h3>
                  <p><strong>Distance:</strong> {store.distance.toFixed(2)} miles</p>
                  {store.url && <p><a href={store.url} target="_blank" rel="noopener noreferrer">Website</a></p>}
                </div>
              ))
            ) : (
              <p>Loading nearest plant stores...</p>
            )}
          </section>
        </div>
      )}

      <style jsx>{`
        .species-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .header h1 {
          margin-top: 0;
        }
        .location {
          color: red;
          font-weight: bold;
        }
        .main-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .content {
          padding: 20px;
        }
        .about, .living-conditions, .future-actions {
          margin-bottom: 20px;
        }
        .nearest-stores {
          margin-top: 30px;
        }
        .store {
          margin-bottom: 20px;
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .store h3 {
          margin: 0;
        }
      `}</style>
    </>
  );
}
