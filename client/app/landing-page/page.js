// app/login/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';

import styles from '../components/LandingPage.module.css'

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  return (
   <div className={styles.container}>
    <h1>Building a better home, bug by bug</h1>
   </div>
  );
}
