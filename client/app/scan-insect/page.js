'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import takePhotoIcon from '../images/scan-icon.png'; 
import uploadImageIcon from '../images/scan-icon.png'; 

export default function ScanSpeciesPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleTakePhoto = () => {
    router.push('/take-photo');
  };

  const handleUploadImage = () => {
    router.push('/upload-image');
  };

  const handleBack = () => {
    router.push('/scan-species');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headerText}>Scan Insect</h1>
      
      <div style={styles.actionContainer}>
        <div onClick={handleTakePhoto} style={styles.actionButton}>
          <Image src={takePhotoIcon} alt="Take Photo" width={100} height={100} />
          <p style={styles.actionText}>Take Photo</p>
        </div>
        <div onClick={handleUploadImage} style={styles.actionButton}>
          <Image src={uploadImageIcon} alt="Upload Image" width={100} height={100} />
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
    fontFamily: 'Arial, sans-serif',
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
  },
  actionText: {
    marginTop: '10px',
    fontSize: '20px',
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

