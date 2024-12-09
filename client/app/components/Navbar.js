import styles from '../components/Navbar.module.css';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('../login');
  }

  const handleSignup = () => {
    router.push('../create-profile');
  }

  const handleHomeClick = () => {
    router.push('/');
  }

  return (
   <div className={styles.container}>
      <div id={styles.navLeft} className={styles.subContainer} onClick={handleHomeClick}>
        <Image src={pollinationImage} alt="PolliNation Logo" id={styles.favicon}/>
        <h3 className={styles.navElement}>PolliNation</h3>
      </div>
      <div id={styles.navRight} className={styles.subContainer}>
        <div className={styles.navElement} onClick={handleLogin}>
          <h3 className={styles.text}>Login</h3>
        </div>
        <div className={styles.navElement} onClick={handleSignup}>
          <h3 id={styles.signUp} className={styles.text}>Sign up</h3>
        </div>
      </div>
   </div>
  );
}
