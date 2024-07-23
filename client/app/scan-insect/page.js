'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png';
import Camera from '../components/Camera';
import { useState } from 'react';
import styles from '../components/ScanInsectPlant.module.css';
import BackButton from '../components/BackButton';
import verifyUser from '../components/verify';

export default function ScanInsectPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleBack = () => {
    router.push('/scan-species');
  };

  return (
    <div className={styles.container}>
      <BackButton onClick={handleBack}></BackButton>
      <h2 className={styles.title}>Take Photo or Choose Existing Image</h2>
      <div className={styles.imageContainer}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
        ) : (
          <div className={styles.placeholder}>
            <Camera />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        capture="camera"
        className={styles.fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
}
