'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Camera from '../../components/Camera';
import { useState } from 'react';
import styles from '../../components/ScanInsectPlant.module.css';
import BackButton from '../../components/BackButton';
import loadingBar from '../../images/loading-bar.png'
import React from 'react';

export default function TakePhoto({ params }) {
  const router = useRouter();
  const type = `${params.val}`;
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaded, setLoaded] = useState(true);

  const handleBack = () => {
    router.push(type === 'insect' ? '../scan-insect' : '../scan-plant');
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
              <Camera setLoaded={setLoaded} type={type}/>
            </div>
          )}
        </div>
      </div>
      }
    </>
  );
}