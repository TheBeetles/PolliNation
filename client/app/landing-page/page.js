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
        <h1>Building a better home, bug by bug</h1>
      </div>
   </div>
  );
}
