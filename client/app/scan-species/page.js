'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png'; // Assuming you have a scan icon image in this path

export default function ScanSpeciesPage() {
  const router = useRouter();

  const handleScanPlant = () => {
    // Navigate to the scan plant page
    router.push('/scan-plant');
  };

  const handleScanInsect = () => {
    // Navigate to the scan insect page
    router.push('/scan-insect');
  };

  const handleSavedSpecies = () => {
    // Navigate to saved species page
    router.push('/saved-species');
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    router.push('/login')
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
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
      <button onClick={handleSavedSpecies} style={styles.savedSpeciesButton}>Saved Species</button>
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
    fontfamily: 'Inter',
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
