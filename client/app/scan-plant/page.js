<<<<<<< Updated upstream
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png';
import { useState } from 'react';

export default function ScanInsectPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
=======
'use client'; // Indicates that this file should be used in a client-side environment in Next.js.
import { useRouter } from 'next/navigation'; // Importing useRouter hook for navigation between pages.
import Image from 'next/image'; // Importing Image component from Next.js for optimized image handling.
import scanIcon from '../images/scan-icon.png'; // Importing an image of a scan icon.
import Camera from '../components/Camera'; // Importing a Camera component to allow users to take photos.
import { useState } from 'react'; // Importing useState hook to manage component state.
import styles from '../components/ScanInsectPlant.module.css'; // Importing CSS module for styling the component.
import BackButton from '../components/BackButton'; // Importing BackButton component for navigation.
import verifyUser from '../components/verify'; // Importing a function to verify the user’s authentication status.

export default function ScanPlantPage() {
  const router = useRouter(); // Initializing the router for page navigation.
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image.
>>>>>>> Stashed changes

  verifyUser(); // Call to verify the user's authentication or permissions before allowing access to the page.

  // Function to handle file input change, reading the selected image and updating the state.
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Access the first file selected by the user.
    if (file) {
      const reader = new FileReader(); // Create a new FileReader to read the image file.
      reader.onload = () => {
        setSelectedImage(reader.result); // Set the selected image to the file’s data URL.
      };
      reader.readAsDataURL(file); // Read the file as a Data URL (base64 encoded string).
    }
  };

  // Function to handle back button click, navigating the user back to the scan-species page.
  const handleBack = () => {
    router.push('/scan-species'); // Navigate to the '/scan-species' route.
  };

  return (
<<<<<<< Updated upstream
    <div style={styles.container}>
      <button onClick={handleBack} style={styles.backButton}>&#8592; Back</button>
      <h2 style={styles.title}>Take Photo or Choose Existing Image</h2>
      <div style={styles.imageContainer}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" style={styles.selectedImage} />
        ) : (
          <div style={styles.placeholder}>
            <Image src={scanIcon} alt="Placeholder" width={100} height={100} />
            No Image Selected
=======
    <div className={styles.container}>
      <BackButton onClick={handleBack}></BackButton> {/* Render the BackButton to allow navigation to the previous page. */}
      <h2 className={styles.title}>Take Photo or Choose Existing Image</h2> {/* Title of the page. */}
      <div className={styles.imageContainer}>
        {selectedImage ? ( // Conditional rendering: if an image is selected, display it, otherwise show the Camera component.
          <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
        ) : (
          <div className={styles.placeholder}>
            <Camera /> {/* Render the Camera component if no image is selected. */}
>>>>>>> Stashed changes
          </div>
        )}
      </div>
      <input 
        type="file"
        accept="image/*"
        capture="camera"
<<<<<<< Updated upstream
        style={styles.fileInput}
        onChange={handleFileChange}
=======
        className={styles.fileInput}
        onChange={handleFileChange} // Trigger handleFileChange when a file is selected.
>>>>>>> Stashed changes
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
