// app/create-profile/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateProfilePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    if (res.ok) {
      router.push('/login');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#F8F8B8', // light yellow background
      position: 'relative',
      margin: '0',
      padding: '0',
      overflow: 'hidden' // Ensure no overflow issues
    }}>
      {/* Background Circles */}
      <div style={{
        position: 'absolute',
        top: '20%',   // Slightly higher
        right: '10%', // Adjusted so it’s more in view
        backgroundColor: '#B7F58C',
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        zIndex: '-1'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '45%',   // Middle circle with better vertical spacing
        right: '15%', // Aligned slightly to the left of the largest circle
        backgroundColor: '#B7F58C',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        zIndex: '-1'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '75%',   // Bottom circle visible lower in the viewport
        right: '5%',  // Slightly closer to the edge for balance
        backgroundColor: '#B7F58C',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        zIndex: '-1'
      }}></div>

      {/* Form Section */}
      <h1 style={{ fontFamily: 'Arial, sans-serif', color: '#333', marginBottom: '20px' }}>Create Profile</h1>
      <form onSubmit={handleCreateProfile} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label style={{ fontSize: '18px', marginBottom: '5px' }}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            marginBottom: '20px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#224D24', // dark green background
            color: '#fff' // white text
          }}
        />
        <label style={{ fontSize: '18px', marginBottom: '5px' }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            marginBottom: '20px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '15px',
            border: 'none',
            backgroundColor: '#224D24', // dark green background
            color: '#fff' // white text
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#B7F58C', // light green background
            border: 'none',
            borderRadius: '10px'
          }}>
          Create Profile
        </button>
      </form>
    </div>
  );
}
