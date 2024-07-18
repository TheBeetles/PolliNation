// app/create-profile/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import pollinationImage from '../images/pollination.png';

export default function CreateProfilePage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleCreateProfile = (e) => {
    e.preventDefault();
    // Add profile creation logic here (e.g., API call)
    console.log('Username:', username);
    console.log('Password:', password);
    router.push('/login')
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={pollinationImage} alt="Pollination Logo" width={200} height={150} />
      <h1>Create Profile</h1>
      <form onSubmit={handleCreateProfile} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Create Profile</button>
      </form>
    </div>
  );
}
