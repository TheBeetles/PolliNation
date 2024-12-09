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
          <div id={styles.temp9}><Image className={styles.temp} src={grasshopper} alt='species'/></div>
        </div>

        <div id={styles.stepsContainer}>
          <h2>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <Image src={ladybug} alt="Create Account" className={styles.stepIcon} />
              <h3>Create an Account</h3>
              <p>Sign up and join our community to start identifying species.</p>
            </div>
            <div className={styles.step}>
              <Image src={ladybug} alt="Choose Identification" className={styles.stepIcon} />
              <h3>Choose Identification</h3>
              <p>Select whether to identify a plant or an insect.</p>
            </div>
            <div className={styles.step}>
              <Image src={ladybug} alt="Upload or Take Photo" className={styles.stepIcon} />
              <h3>Upload or Take a Photo</h3>
              <p>Use your device's camera or upload an image for analysis.</p>
            </div>
            <div className={styles.step}>
              <Image src={ladybug} alt="Read About Species" className={styles.stepIcon} />
              <h3>Read About the Species</h3>
              <p>Learn fascinating details about the identified species.</p>
            </div>
          </div>

          <h3 id={styles.signUp} onClick={handleStartClick} style={{ width: '11vw', textAlign: 'center' }}>Start Scanning</h3>
        </div>
      </div>
    </div>
  );
}
