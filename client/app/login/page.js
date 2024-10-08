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
    // API call
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={pollinationImage} alt="Pollination Logo" width={200} height={150} />
      <h1 style={{ color: 'darkgreen' }}>Welcome!</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
            required
            style={{ padding: '10px', fontSize: '16px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            required
            style={{ padding: '10px', fontSize: '16px', width: '100%' }}
          />
        </div>
        <button type="submit" style={{
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}>Login</button>
        <h3 style={{ color: 'red' }}>{error}</h3>
      </form>
      <button onClick={handleCreateProfile} style={{
        marginTop: '20px',
        padding: '10px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#8BC34A',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
      }}>Create Profile</button>
    </div>
  );
}
