'use client'
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import insectImage from '../../images/insect.png';
import verifyUser from '../../components/verify';
import BackButton from '../../components/BackButton';

export default function SpeciesInformation({ params }) {
  verifyUser();
  const router = useRouter();
  /* speciesData is the state variable that will hold information about the species
  fetched from the server. setSpeciesData is the state setter function to update
  speciesData. speciesData initialized to null. */
  const [speciesData, setSpeciesData] = useState(null);
  const [image, setImage] = useState('');
  const route = '/api/image/get/' + params.val;

  useEffect(() => {
    const fetchSpeciesData = async () => {
      const res = await fetch(route, {
        method: 'GET',
      });
      const blob = await res.blob();
      const objectURL = URL.createObjectURL(blob);
      setImage(objectURL);
    };
    const fetchImage = async () => {
      const res = await fetch('/api/get/image/info/' + params.val, {
        method: 'GET',
      });
      const data = await res.json();
      setSpeciesData(data);
    };

    fetchSpeciesData();
    fetchImage();
  }, [params.val]);

    const handleBack = () => {
        history.back();
    }

  //rendering data
  /* Information fields:
    - speciesData.name is for common name
    - speciesData.native displays Native or Invasive
    - speciesData.scientific retrieves scientific name
    - speciesData.description retrieves descriptions
    - speciesData.living retrieves living conditions
    - speciesData.future retrieves future actions
  */
  return (
    <>
      {speciesData === null && <h1>Loading...</h1>}
      {speciesData !== null && <Head>
        <title>Species Information</title>
        <meta name="description" content={`Information about ${speciesData.name}`} />
      </Head>}
      {speciesData !== null &&
      <div className="species-container">
      <BackButton onClick={handleBack}></BackButton>
        <header className="header">
          <h1>{speciesData.name || speciesData.Failed}</h1> 
          { speciesData.name !== undefined && <p>{speciesData.native ? 'Native' : <span className="location">Invasive</span>} Species</p>}
        </header>
        <img
          src={image}
          alt={speciesData.name}
          width={800}
          height={450}
          className="main-image"
        />
        { speciesData.name !== undefined && <div className="content">
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
        </div> }
      </div>}

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
        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 24px;
          text-decoration: none;
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
      `}</style>
    </>
  );
}
