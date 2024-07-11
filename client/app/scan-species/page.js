'use client'
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png'; // Correct relative path
import { useRouter } from 'next/navigation'; // Import from next/navigation instead of next/router
import { useEffect, useState } from 'react';

export default function ScanSpeciesPage() {
  const router = useRouter();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Check if we're in the client-side environment
    if (typeof window !== 'undefined') {
      // Additional client-side initialization logic can go here
    }
  }, []);

  const handleScanPlant = () => {
    console.log('Scan a Plant clicked');
    // Add scan plant logic here
  };

  const handleScanInsect = () => {
<<<<<<< Updated upstream
    setIsCameraOpen(true); // Open camera/photo upload options
    setSelectedImage(null); // Reset selected image when scanning insect
=======
    // Add your scan insect logic here
    console.log('Scan an Insect clicked');
    router.push('/scan-species/scan-insect')
>>>>>>> Stashed changes
  };

  const handleScanImage = () => {
    if (selectedImage) {
      // Process the scanned image logic here
      console.log('Scan Image button clicked');
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    router.navigate('/login'); // Navigate to login page
    // Add logout logic here
  };

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

  const handleCameraCapture = () => {
    // Logic to handle camera capture
    // This function can be customized based on the requirements for capturing photos
    console.log('Capture Photo button clicked');
  };

  const handleBack = () => {
    setIsCameraOpen(false);
    setSelectedImage(null);
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      {!isCameraOpen && (
        <div style={styles.scanContainer}>
          <div onClick={handleScanPlant} style={styles.scanBox}>
            <Image src={scanIcon} alt="Scan a Plant" width={100} height={100} />
            <p style={styles.scanText}>Scan a Plant</p>
          </div>
          <p style={styles.orText}>OR</p>
          <div onClick={handleScanInsect} style={styles.scanBox}>
            <Image src={scanIcon} alt="Scan an Insect" width={100} height={100} />
            <p style={styles.scanText}>Scan an Insect</p>
          </div>
        </div>
      )}
      {isCameraOpen && (
        <div style={styles.cameraContainer}>
          <button onClick={handleBack} style={styles.backButton}>&#8592; Back</button>
          <h2 style={styles.title}>Take Photo or Choose Existing Image</h2>
          <div style={styles.imageContainer}>
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" style={styles.selectedImage} />
            ) : (
              <div style={styles.placeholder}>
                <Image src={scanIcon} alt="Placeholder" width={100} height={100} />
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
          <button
            onClick={handleCameraCapture}
            disabled={!selectedImage} // Disable the button if no image is selected
            style={styles.savedSpeciesButton}
          >
            Scan Image
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    backgroundColor: '#fff',
    padding: '20px',
    fontFamily: 'Inter', // Corrected fontfamily to fontFamily
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '20px',
    backgroundColor: '#B3E576',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  scanContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40vh',
    margin: '1em 0',
  },
  scanBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '150px',
    height: '150px',
    border: '2px solid #000',
    borderRadius: '10px',
    margin: '0 20px',
    cursor: 'pointer',
  },
  scanText: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#2E8B57',
  },
  orText: {
    fontSize: '24px',
    color: '#000',
  },
  cameraContainer: {
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
  },
  title: {
    fontSize: '24px',
    margin: '20px 0',
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
    color: '#aaa',
  },
  fileInput: {
    marginTop: '20px',
  },
  savedSpeciesButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '20px',
    backgroundColor: '#B3E576',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    margin: '1em 0 0 0',
  },
};
