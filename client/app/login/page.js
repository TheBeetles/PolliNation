// app/login/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png'; // Keeping the Pollination Logo

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    if (res.ok) {
      router.push('/scan-species');
    } else {
      setError('Incorrect username or password');
    }
  };

  const handleCreateProfile = () => {
    router.push('/create-profile');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#F8F8B8', // Matching background with Create Profile page
      position: 'relative',
      margin: '0',
      padding: '0',
      overflow: 'hidden' // Ensure circles are visible and contained within the page
    }}>
      {/* Background Circles - Top Right */}
      <div style={{
        position: 'absolute',
        top: '5%',
        right: '5%',
        backgroundColor: '#B7F58C',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        zIndex: '0' // Set z-index lower than other elements
      }}></div>
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '15%',
        backgroundColor: '#B7F58C',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        zIndex: '0'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '10%',
        backgroundColor: '#B7F58C',
        width: '75px',
        height: '75px',
        borderRadius: '50%',
        zIndex: '0'
      }}></div>

      {/* Background Circles - Bottom Left */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '5%',
        backgroundColor: '#B7F58C',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        zIndex: '0'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        backgroundColor: '#B7F58C',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        zIndex: '0'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '10%',
        backgroundColor: '#B7F58C',
        width: '75px',
        height: '75px',
        borderRadius: '50%',
        zIndex: '0'
      }}></div>

      {/* Form Section */}
      <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333', marginBottom: '20px' }}>Welcome!</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', zIndex: '1' }}>
        <label style={{ fontSize: '18px', marginBottom: '5px' }}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setError(''); }}
          required
          style={{
            marginBottom: '20px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#224D24', // Dark green background
            color: '#fff' // White text
          }}
        />
        <label style={{ fontSize: '18px', marginBottom: '5px' }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(''); }}
          required
          style={{
            marginBottom: '20px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#224D24', // Dark green background
            color: '#fff' // White text
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit"
            style={{
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#B7F58C', // Light green background
              border: 'none',
              borderRadius: '10px',
              width: '48%'
            }}>
            Login
          </button>
          <button
            type="button"
            onClick={handleCreateProfile}
            style={{
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#8BC34A', // Slightly darker green for contrast
              border: 'none',
              borderRadius: '10px',
              width: '48%'
            }}>
            Create Profile
          </button>
        </div>
        <h3 style={{ color: 'red', marginTop: '10px' }}>{error}</h3>
      </form>
    </div>
  );
}
