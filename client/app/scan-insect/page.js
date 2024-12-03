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
'use client'; // This indicates that the code is running on the client side in a Next.js application.
import { useRouter } from 'next/navigation'; // Importing useRouter hook for client-side navigation between pages.
import Image from 'next/image'; // Importing the Image component from Next.js for optimized image handling.
import scanIcon from '../images/scan-icon.png'; // Importing a scan icon image to be used in the component (though not utilized in this code).
import Camera from '../components/Camera'; // Importing the Camera component, which allows the user to take photos.
import { useState } from 'react'; // Importing the useState hook to manage the state within the component.
import styles from '../components/ScanInsectPlant.module.css'; // Importing CSS module for styling specific to this component.
import BackButton from '../components/BackButton'; // Importing the BackButton component for navigation to the previous page.
import verifyUser from '../components/verify'; // Importing a function to verify if the user is authenticated or has the necessary permissions.

export default function ScanInsectPage() {
  const router = useRouter(); // Initializing the useRouter hook for handling page navigation.
  const [selectedImage, setSelectedImage] = useState(null); // Declaring state to store the selected image's data URL.
>>>>>>> Stashed changes

  verifyUser(); // Calling verifyUser to ensure the user is authenticated or authorized before proceeding.

  // Function to handle changes in the file input (image selection).
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Access the first file selected by the user.
    if (file) {
      const reader = new FileReader(); // Creating a new FileReader to read the file.
      reader.onload = () => {
        setSelectedImage(reader.result); // Setting the state with the image's data URL once the file is read.
      };
      reader.readAsDataURL(file); // Reading the selected file as a Data URL (base64 encoded string).
    }
  };

  // Function to handle the back button click event, navigating the user back to the scan-species page.
  const handleBack = () => {
    router.push('/scan-species'); // Navigates to the '/scan-species' route when the back button is clicked.
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
      <BackButton onClick={handleBack}></BackButton> {/* Renders the BackButton, allowing the user to go back to the previous page. */}
      <h2 className={styles.title}>Take Photo or Choose Existing Image</h2> {/* Displays the title of the page. */}
      <div className={styles.imageContainer}>
        {selectedImage ? ( // Conditionally renders the selected image if available; otherwise, shows the Camera component.
          <img src={selectedImage} alt="Selected" className={styles.selectedImage} />
        ) : (
          <div className={styles.placeholder}>
            <Camera /> {/* Renders the Camera component for capturing a photo if no image is selected. */}
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
        onChange={handleFileChange} // Triggers handleFileChange when the user selects a file.
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
