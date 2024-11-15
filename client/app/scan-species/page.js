'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import verifyUser from '../components/verify';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png';

export default function ScanSpeciesPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  verifyUser();

  const handleScanPlant = () => {
    console.log('Scan a Plant clicked');
    router.push('/scan-plant');
  };

  const handleScanInsect = () => {
    console.log('Scan an Insect clicked');
    router.push('/scan-insect');
  };

  const handleSavedSpecies = () => {
    router.push('/saved-species');
  };

  const handleBack = () => {
    router.push('/previous-page');
  };

  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      method: 'GET',
    });
    if (res.ok) {
      router.push('/login');
    } else {
      setError('Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.headerText}>Hello User!</h1>
      <div style={styles.scanContainer}>
        <div onClick={handleScanPlant} style={styles.scanBox}>
          <Image src={scanIcon} alt="Scan a Plant" width={220} height={220} />
          <p style={styles.scanText}>Scan Plant</p>
        </div>
        <div onClick={handleScanInsect} style={styles.scanBox}>
          <Image src={scanIcon} alt="Scan an Insect" width={220} height={220} />
          <p style={styles.scanText}>Scan Insect</p>
        </div>
      </div>
      <button onClick={handleSavedSpecies} style={styles.savedSpeciesButton}>Saved Species</button>
      <button onClick={handleBack} style={styles.backButton}>Back</button>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      <h1 style={styles.errorText}>{error}</h1>
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
    padding: '20px',
    fontFamily: 'Verdana, sans-serif',
  },
  headerText: {
    fontSize: '36px',
    color: '#000',
    position: 'absolute', 
    top: '20px', 
    left: '20px', 
    marginBottom: '10px',
  },
  scanContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: '20px',
  },
  scanBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '375px',
    height: '375px',
    backgroundColor: '#C5F681',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  scanText: {
    marginTop: '10px',
    fontSize: '40px',
    color: '#000',
  },
  savedSpeciesButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '20px',
    backgroundColor: '#1B5E20',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
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
  logoutButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
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
    marginTop: '20px',
  },
};

