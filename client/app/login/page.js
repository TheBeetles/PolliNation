// app/login/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleCreateProfile = () => {
    router.push('/create-profile');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={pollinationImage} alt="Pollination" width={200} height={150} />
      <h1>Welcome!</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Login</button>
      </form>
      <button onClick={handleCreateProfile} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>Create Profile</button>
    </div>
  );
}
