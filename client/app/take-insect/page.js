'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png';
import Camera from '../components/Camera';
import { useState } from 'react';
import styles from '../components/ScanInsectPlant.module.css';
import BackButton from '../components/BackButton';
import cameraStyles from '../components/Camera.module.css';
import loadingBar from '../images/loading-bar.png'
import React from 'react';

export default function TakeInsectPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaded, setLoaded] = useState(true);

  // sends the image into the api
  const uploadPhoto  = async () => {

    setLoaded(false);
    const response = await fetch('/api/image/insect/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpg'
      },
        body: selectedImage
    });
    const data = await response.json();
    if (response.ok) {
      router.push("/species-information/" + data['image']);
    } else {
      // sends a request to delete image on unknown species error
      const res = await fetch('/api/image/delete', {
          method: 'POST',
          body: JSON.stringify({
              "id": data['image']
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
      });
      
      alert(data['Failed']);
      setLoaded(true);
    }
  };

  const handleBack = () => {
    router.push('/scan-insect');
  };

  return (
    <>
      {loaded == false && <div className={styles.container} style={{ height: '97vh', padding: '0' }}><Image src={loadingBar} alt="Loading Bar" width={400} /></div>}
      {loaded == true &&
      <div className={styles.container}>
        <BackButton onClick={handleBack}></BackButton>
        <h2 className={styles.title}>Take Photo</h2>

        <div className={styles.imageContainer}>
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
          ) : (
            <div className={styles.placeholder}>
              <Camera setLoaded={setLoaded}/>
            </div>
          )}
        </div>
      </div>
      }
    </>
  );
}