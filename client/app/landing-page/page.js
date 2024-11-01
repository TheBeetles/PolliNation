// app/login/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';

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
          <div id={styles.temp1} className={styles.temp}></div>
          <div id={styles.temp2} className={styles.temp}></div>
          <div id={styles.temp3} className={styles.temp}></div>
          <div id={styles.temp4} className={styles.temp}></div>
          <div id={styles.temp5} className={styles.temp}></div>
          <div id={styles.temp6} className={styles.temp}></div>
          <div id={styles.temp7} className={styles.temp}></div>
          <div id={styles.temp8} className={styles.temp}></div>
        </div>
      </div>
   </div>
  );
}
