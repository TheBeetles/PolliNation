// app/login/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';

import lanternfly from '../images/lanternfly.png';
import ladybug from '../images/ladybug.webp';
import potatobeetle from '../images/potatobeetle.webp';
import rosebay from '../images/rosebay.webp';
import magnolia from '../images/magnolia.webp';
import allium from '../images/allium.webp';
import flamingolily from '../images/flamingolily.webp';
import crimsonrose from '../images/crimsonrose.jpg';

import camera from '../images/camera.png';

import styles from '../components/LandingPage.module.css'
import Navbar from '../components/Navbar.js'

export default function LandingPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  return (
   <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1 id={styles.header}>Building a better home,<br/>bug by bug</h1>
        <div id={styles.imageGrid}>
          <div id={styles.temp1}><Image className={styles.temp} src={crimsonrose} alt='species'/></div>
          <div id={styles.temp2}><Image className={styles.temp} src={flamingolily} alt='species'/></div>
          <div id={styles.temp3}><Image className={styles.temp} src={ladybug} alt='species'/></div>
          <div id={styles.temp4}><Image className={styles.temp} src={rosebay} alt='species'/></div>
          <div id={styles.temp5}><Image className={styles.temp} src={allium} alt='species'/></div>
          <div id={styles.temp6}><Image className={styles.temp} src={magnolia} alt='species'/></div>
          <div id={styles.temp7}><Image className={styles.temp} src={potatobeetle} alt='species'/></div>
          {/* <div id={styles.temp8}><Image className={styles.temp} src={lanternfly}/></div> */}
          <div id={styles.temp9}><Image className={styles.temp} src={lanternfly} alt='species'/></div>
        </div>
      </div>

      <h3 id={styles.signUp}>Start Scanning</h3>
      <Image src={camera} className={styles.camera} alt='camera'/>
   </div>
  );
}
