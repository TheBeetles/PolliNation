// app/login/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';

import lanternfly from '../images/lanternfly.png';
import ladybug from '../images/ladybug.webp';
import rosebay from '../images/rosebay.webp';
import cham from '../images/cham.jpg';
import wildplant from '../images/wildplant.webp';
import grasshopper from '../images/grasshopper.jpg';
import dragonfly from '../images/dragonfly.webp';
import butterfly from '../images/butterfly.webp';

import camera from '../images/camera.png';

import styles from '../components/LandingPage.module.css'
import Navbar from '../components/Navbar.js'

export default function LandingPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleStartClick = () => {
    router.push('/create-profile');
  }

  return (
   <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1 id={styles.header}>Building a better home,<br/>bug by bug</h1>
        <div id={styles.imageGrid}>
          <div id={styles.temp1}><Image className={styles.temp} src={lanternfly} alt='species'/></div>
          <div id={styles.temp2}><Image className={styles.temp} src={dragonfly} alt='species'/></div>
          <div id={styles.temp3}><Image className={styles.temp} src={ladybug} alt='species'/></div>
          <div id={styles.temp4}><Image className={styles.temp} src={rosebay} alt='species'/></div>
          <div id={styles.temp5}><Image className={styles.temp} src={cham} alt='species'/></div>
          <div id={styles.temp6}><Image className={styles.temp} src={butterfly} alt='species'/></div>
          <div id={styles.temp7}><Image className={styles.temp} src={wildplant} alt='species'/></div>
          {/* <div id={styles.temp8}><Image className={styles.temp} src={lanternfly}/></div> */}
          <div id={styles.temp9}><Image className={styles.temp} src={grasshopper} alt='species'/></div>
        </div>
      </div>
        {/* <Image src={camera} className={styles.camera} alt='camera'/> */}
        <h3 id={styles.signUp} onClick={handleStartClick} style={{ width: '11vw', textAlign: 'center' }}>Start Scanning</h3>
   </div>
  );
}
