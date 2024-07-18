'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png';
import Camera from '../components/Camera';
import { useState } from 'react';

export default function ScanInsectPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleBack = () => {
    router.push('/scan-species');
  };

  return (
    <div style={styles.container}>
      <button onClick={handleBack} style={styles.backButton}>&#8592; Back</button>
      <h2 style={styles.title}>Take Photo or Choose Existing Image</h2>
      <div style={styles.imageContainer}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" style={styles.selectedImage} />
        ) : (
          <div style={styles.placeholder}>
            <Image src={scanIcon} alt="Placeholder" width={100} height={100} />
            <Camera />
            No Image Selected
          </div>
        )}
      </div>
      <input 
        type="file"
        accept="image/*"
        capture="camera"
        style={styles.fileInput}
        onChange={handleFileChange}
      />
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
    backgroundColor: '#fff',
    padding: '20px',
    fontFamily: 'Inter',
  },
  backButton: {
    alignSelf: 'flex-start',
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#B3E576',
  },
  title: {
    fontSize: '24px',
    margin: '20px 0',
    color: '#B3E576',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  selectedImage: {
    width: '100%',
    height: 'auto',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: '#B3E576',
  },
  fileInput: {
    marginTop: '20px',
  },
};
