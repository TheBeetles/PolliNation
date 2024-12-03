'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import takePhotoIcon from '../images/camera_scan.jpg'; 
import uploadImageIcon from '../images/upload_scan.jpg';
import cameraStyles from '../components/Camera.module.css';
import React from 'react';

export default function ScanSpeciesPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(true);
  const fileInputRef = React.createRef();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTakePhoto = () => {
    router.push('/take-photo/insect');
  };

  const handleUploadImage = () => {
    fileInputRef.current.click();
  };

  const handleBack = () => {
    router.push('/scan-species');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        uploadPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto  = async (imageData) => {

    setLoaded(false);
    const response = await fetch('/api/image/insect/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpg'
      },
        body: imageData
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

  return (
    <div style={styles.container}>
      <h1 style={styles.headerText}>Scan Insect</h1>
      
      <div style={styles.actionContainer}>
        <div onClick={handleTakePhoto} style={styles.actionButton}>
          <div style={styles.imageWrapper}>
            <Image src={takePhotoIcon} alt="Take Photo" layout="fill" objectFit="contain" />
          </div>
          <p style={styles.actionText}>Take Photo</p>
        </div>
        <div onClick={handleUploadImage} style={styles.actionButton}>
          <div style={styles.imageWrapper}>
            <Image src={uploadImageIcon} alt="Upload Image" layout="fill" objectFit="contain" />
            <input
                type="file"
                accept="image/*"
                capture="camera"
                className={cameraStyles.fileInput}
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
          </div>
          <p style={styles.actionText}>Upload Image</p>
        </div>
      </div>

      <button onClick={handleBack} style={styles.backButton}>Back</button>
      
      {error && <h2 style={styles.errorText}>{error}</h2>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#FFFDD0',
    fontFamily: 'Verdana, sans-serif',
  },
  headerText: {
    fontSize: '36px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '360px',
    height: '360px',
    backgroundColor: '#C5F681',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    textAlign: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: '150px',
    height: '150px',
  },
  actionText: {
    marginTop: '10px',
    fontSize: '24px',
    color: '#333',
    fontWeight: '500',
  },
  backButton: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '20px',
    backgroundColor: '#1B5E20',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
  },
  errorText: {
    color: 'red',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
};
