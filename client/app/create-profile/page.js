// 'use client' directive for Next.js to indicate this is a client-side component
'use client';

// Importing necessary hooks and components
import { useRouter } from 'next/navigation'; // For navigation within the app
import { useState } from 'react'; // For managing local state
import Image from 'next/image'; // For optimized image rendering in Next.js
import pollinationImage from '../images/pollination.png'; // Importing the image to be used in the component

// Define the CreateProfilePage component
export default function CreateProfilePage() {
  // State variables to hold the username and password input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // useRouter hook for navigation
  const router = useRouter();

  // Function to handle the form submission
  const handleCreateProfile = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    console.log('Username:', username);  // Log the entered username to the console
    console.log('Password:', password);  // Log the entered password to the console
    router.push('/login'); // Navigate to the login page after form submission
  };

  // Return the JSX that renders the UI
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Image src={pollinationImage} alt="Pollination Logo" width={200} height={150} /> {/* Render the image */}
      <h1>Create Profile</h1> {/* Heading for the page */}
      <form onSubmit={handleCreateProfile} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Create Profile</button> {/* Submit button */}
      </form>
    </div>
  );
}
