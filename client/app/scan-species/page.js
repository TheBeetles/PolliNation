'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import verifyUser from '../components/verify';
import Image from 'next/image';
import scanIcon from '../images/scan-icon.png';

export default function ScanSpeciesPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  verifyUser();

  const handleScanPlant = () => {
    console.log('Scan a Plant clicked');
    router.push('/scan-plant');
  };

  const handleScanInsect = () => {
    console.log('Scan an Insect clicked');
    router.push('/scan-insect');
  };

  const handleSavedSpecies = () => {
    router.push('/saved-species');
  };

  const handleBack = () => {
    router.push('/previous-page');
  };

  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      method: 'GET',
    });
    if (res.ok) {
      router.push('/login');
    } else {
      setError('Something went wrong');
    }
  };
