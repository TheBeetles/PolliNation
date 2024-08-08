'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png';
import Camera from '../components/Camera';
import { useState } from 'react';
import styles from '../components/ScanInsectPlant.module.css';
import BackButton from '../components/BackButton';
import verifyUser from '../components/verify';
import cameraStyles from '../components/Camera.module.css';
import React from 'react';

export default function ScanInsectPage() {
  const router = useRouter();
  const fileInputRef = React.createRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [toggle, setToggle] = useState(false);
  verifyUser();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto  = async () => {

    document.body.classList.add('hide-all');

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
    }
  };

  const initiateFileChange = () => {
    fileInputRef.current.click();
  };

  const toggleInput = () => {
    setToggle(!toggle);
  };

  const handleBack = () => {
    router.push('/scan-species');
  };

  return (
    <div className={styles.container}>
      <BackButton onClick={handleBack}></BackButton>
      <h2 className={styles.title}>Take Photo or Choose Existing Image for Insect</h2>

      <button onClick={toggleInput} className={cameraStyles.button}>
        Toggle Photo Upload Method
      </button>

      { toggle && <div className={styles.imageContainer}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
        ) : (
          <div className={styles.placeholder}>
            <Camera />
          </div>
        )}
      </div> }

      { !toggle && <div className={styles.imageContainer} style={{ margin: '0'}}>
        {selectedImage ? (
          <div>
            <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className={cameraStyles.button} onClick={uploadPhoto}>Upload Photo</button>
            <button onClick={initiateFileChange} className={cameraStyles.button}>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                className={cameraStyles.button}
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
             Choose New
            </button>
            </div>
          </div>
        ) : (
          <div className={cameraStyles.wrapper}>
            <div className={styles.buttonWrapper}>
            <button onClick={initiateFileChange} className={cameraStyles.button} style={{ margin: 0 }}>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                className={cameraStyles.fileInput}
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              Choose Existing Photo
            </button>
            </div>
          </div>
        )}
      </div> }

    </div>
  );
}
