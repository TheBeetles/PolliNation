// app/create-profile/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Add your account creation logic here
      router.push('/login'); // Redirect to login page upon successful profile creation
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#F8F8B8', // Beige background color
    }}>
      {/* Content Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '4px solid #3A6B3A', // Green border around content
        borderRadius: '15px',
        backgroundColor: '#F8F8B8',
      }}>
        <h1 style={{
          fontFamily: 'Arial, sans-serif',
          color: 'black',
          marginBottom: '20px'
        }}>
          Create Profile
        </h1>
        <form onSubmit={handleCreateAccount} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
              backgroundColor: '#fff', // White background
              color: '#000' // Black text
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
              backgroundColor: '#fff', // White background
              color: '#000' // Black text
            }}
          />
          <label style={{ fontSize: '18px', marginBottom: '5px' }}>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
            required
            style={{
              marginBottom: '20px',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '15px',
              border: 'none',
              backgroundColor: '#fff', // White background
              color: '#000' // Black text
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#8BC34A', // Slightly darker green for contrast
              border: 'none',
              borderRadius: '10px',
              width: '100%'
            }}>
            Create Profile
          </button>
          <h3 style={{ color: 'red', marginTop: '10px' }}>{error}</h3>
        </form>
      </div>
    </div>
  );
}
