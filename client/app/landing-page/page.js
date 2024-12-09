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

import accountIcon from '../images/account.png';
import identifyIcon from '../images/identify.png';
import cameraIcon from '../images/cameraIcon.png';
import bookIcon from '../images/book.png';

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
              <Image src={accountIcon} alt="Create Account" className={styles.stepIcon} />
              <h3>Create an Account</h3>
              <p>Sign up and join our community to start identifying species.</p>
            </div>
            <div className={styles.step}>
              <Image src={identifyIcon} alt="Choose Identification" className={styles.stepIcon} />
              <h3>Choose Identification</h3>
              <p>Select whether to identify a plant or an insect.</p>
            </div>
            <div className={styles.step}>
              <Image src={cameraIcon} alt="Upload or Take Photo" className={styles.stepIcon} />
              <h3>Upload or Take a Photo</h3>
              <p>Use your device's camera or upload an image for analysis.</p>
            </div>
            <div className={styles.step}>
              <Image src={bookIcon} alt="Read About Species" className={styles.stepIcon} />
              <h3>Read About the Species</h3>
              <p>Learn fascinating details about the identified species.</p>
            </div>
          </div>

          <div id={styles.statsContainer}>
          <h2>Our Impact</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <h3>10,000+</h3>
              <p>Species Identified</p>
            </div>
            <div className={styles.stat}>
              <h3>5,000+</h3>
              <p>Active Users</p>
            </div>
            <div className={styles.stat}>
              <h3>1M+</h3>
              <p>Scans Completed</p>
            </div>
          </div>
        </div>


          <div id={styles.reviewsContainer}>
          <h2>User Reviews</h2>
          <div className={styles.reviews}>
            <div className={styles.review}>
              <Image src={accountIcon} alt="User" className={styles.reviewAvatar} />
              <div className={styles.reviewContent}>
                <h4 className={styles.userName}>Bob Rack</h4>
                <p>"This app is amazing! I've learned so much about the insects in my tomato garden."</p>
              </div>
            </div>
            <div className={styles.review}>
              <Image src={accountIcon} alt="User" className={styles.reviewAvatar} />
              <div className={styles.reviewContent}>
                <h4 className={styles.userName}>Jane Doe</h4>
                <p>"A must-have for nature enthusiasts. It's accurate and so easy to use."</p>
              </div>
            </div>
            <div className={styles.review}>
              <Image src={accountIcon} alt="User" className={styles.reviewAvatar} />
              <div className={styles.reviewContent}>
                <h4 className={styles.userName}>John Smith</h4>
                <p>"Identifying plants has never been easier. Highly recommended!"</p>
              </div>
            </div>
          </div>
        </div>

        <div id={styles.faqContainer}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faq}>
          <div className={styles.question}>
            <h4>Is the app free?</h4>
            <p>Yes! The app is completely free to use.</p>
          </div>
          <div className={styles.question}>
            <h4>What types of species can I identify?</h4>
            <p>You can identify various plants and insects from all over the world.</p>
          </div>
        </div>
      </div>


          <h3 id={styles.signUp} onClick={handleStartClick} style={{ width: '11vw', textAlign: 'center' }}>Start Scanning</h3>
        </div>
      </div>
    </div>
  );
}
