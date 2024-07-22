// app/saved-species/saved-species.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import placeholder from '../images/pollination.png';
import verifyUser from '../components/verify';

export default function SavedSpeciesPage() { 
    const router = useRouter();
    const [data, setData] = useState([]);
    const [image, setImage] = useState('');
    verifyUser();
    const handleGoBackButton = () => { 
        console.log('Go Back Button clicked');
        router.push('/scan-species');
    };

    useEffect(() => {
        const response = async () => {
            const val = await fetch('/api/image/all', {
              method: 'GET'
            }).then(
                (r) => { return r.json(); }
            );
            setData(val['data']);
        }
        response();
    },[]);
        
    useEffect(() => {
    const response = async () => {
        const res = await fetch('/api/image/get/' + data[0], {
          method: 'GET'
        }).then((r) => {return r.blob();}).then(
          (thing) => {
            const objectURL = URL.createObjectURL(thing);
            setImage(objectURL);
          }
        );
    };
    response();
  }, [data]); 
    
    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
        }}>
            <button onClick={handleGoBackButton} style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '10px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#B3E576',
                color: 'white',
                borderRadius: '20px',
                border: 'none',
            }}>
                Back
            </button>
            <h1 style={{
                marginBottom: '10px',
                color: '#2E8B57',
                fontSize: '24px',
            }}>
                Saved List
            </h1>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '300px',
                marginBottom: '20px',
            }}>
                <div style={{
                    padding: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '10px',
                }}>
                    Plants
                </div>
                <div style={{
                    padding: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '10px',
                }}>
                    Insects
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                }}>
                    {/* Placeholder images for Plants */}
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} style={{
                            width: '100px',
                            height: '100px',
                            border: '2px solid #000000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundImage: placeholder,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                        }}>
                        </div>
                    ))}
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                }}>
                    {/* Placeholder images for Insects */}
                    <div style={{
                        width: '100px',
                        height: '100px',
                        border: '2px solid #000000',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <img src={image} alt="Insect" style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}/>
                    </div>
                    {Array.from({ length: 11 }).map((_, index) => (
                        <div key={index} style={{
                            width: '100px',
                            height: '100px',
                            border: '2px solid #000000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundImage: 'url(/path/to/placeholder/image.svg)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                        }}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
