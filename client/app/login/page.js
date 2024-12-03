// app/login/page.js
// 'use client' directive for Next.js to indicate this is a client-side component
'use client';
import { useRouter } from 'next/navigation'; // For navigation within the app
import { useState } from 'react';            // For managing local state
import Image from 'next/image';             // For optimized image rendering in Next.js
import pollinationImage from '../images/pollination.png';  // Importing the image to be used in the component

// Define the LoginPage component
export default function LoginPage() {
   // Use the useRouter hook to access the router for navigation
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
   
    console.log('Username:', username);
    console.log('Password:', password);
    router.push('/scan-species'); // Navigate to the scan-species page after successful login
  };

   // Function to navigate to the create-profile page
  const handleCreateProfile = () => {
    router.push('/create-profile');
  };

   // Return the JSX that renders the UI
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={pollinationImage} alt="Pollination Logo" width={200} height={150} />
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
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Login</button>
      </form>
      <button onClick={handleCreateProfile} style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Create Profile</button>
    </div>
  );
}
