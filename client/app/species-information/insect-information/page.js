// 'use client' directive for Next.js to indicate this is a client-side component
'use client';

// Import necessary hooks and components
import { useRouter } from 'next/navigation'; // For navigation within the app
import { useState } from 'react'; // For managing local state
import Image from 'next/image'; // For optimized image rendering in Next.js
import pollinationImage from '../images/pollination.png'; // Importing the image to be used in the component

// Define the LoginPage component
export default function LoginPage() {
  const router = useRouter(); // Initialize router for navigation
  const [username, setUsername] = useState(''); // State variable for username input
  const [password, setPassword] = useState(''); // State variable for password input

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Add login logic here (e.g., API call)
    console.log('Username:', username); // Log the entered username
    console.log('Password:', password); // Log the entered password
    router.push('/scan-species'); // Navigate to the scan-species page
  };

  // Function to navigate to the create-profile page
  const handleCreateProfile = () => {
    router.push('/create-profile'); // Navigate to the create-profile page
  };

  // Render the component UI
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={pollinationImage} alt="Pollination Logo" width={200} height={150} /> {/* Render the image */}
      <h1>Welcome!</h1> {/* Heading for the page */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        /> {/* Input field for the username */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        /> {/* Input field for the password */}
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Login</button> {/* Submit button for login */}
      </form>
      <button onClick={handleCreateProfile} style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Create Profile</button> {/* Button to navigate to create profile page */}
    </div>
  );
}
