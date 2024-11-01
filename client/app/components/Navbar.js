import styles from '../components/Navbar.module.css';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';

export default function Navbar() {
  return (
   <div className={styles.container}>
      <div id={styles.navLeft} className={styles.subContainer}>
        <Image src={pollinationImage} id={styles.favicon}/>
        <h3 className={styles.navElement}>PolliNation</h3>
      </div>
      <div id={styles.navRight} className={styles.subContainer}>
        <h3 className={styles.navElement}>Login</h3>
        <div className={styles.navElement}>
          <h3 id={styles.signUp}>Sign up</h3>
        </div>
      </div>
   </div>
  );
}
