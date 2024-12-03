'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import plantIcon from '../images/plant.png';
import insectIcon from '../images/dragonfly.png';
import verifyUser from '../components/verify';
import BackButton from '../components/BackButton';

export default function SavedSpeciesPage() {
    const router = useRouter();
    verifyUser();

    // Back button handler
    const handleGoBackButton = () => {
        router.push('/scan-species');
    };

    // Click handlers for plant and insect buttons
    const handlePlantClick = () => {
        router.push('/saved-species-select/plant');
    };

    const handleInsectClick = () => {
        router.push('/saved-species-select/insect');
    };

    return (
        <div 
            style={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#FFFDD0',
                fontFamily: 'Verdana, sans-serif', 
            }}
        >
            {/* Back Button */}
            <BackButton onClick={handleGoBackButton}/>
            {/* Page Title */}
            <h1 style={{
                marginBottom: '50px',
                color: '#000',
                fontSize: '45px',
            }}>
                Saved Species
            </h1>

            {/* Plant and Insect Categories */}
            <div style={{
                display: 'flex',
                gap: '60px',
            }}>
                {/* Plant Button */}
                <div onClick={handlePlantClick} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '375px',
                    height: '375px',
                    backgroundColor: '#B3E576',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                    <img src={plantIcon.src} alt="Plant Icon" style={{
                        width: '230px',
                        height: '230px',
                        marginBottom: '10px',
                    }}/>
                    <span style={{
                        color: '#000',
                        fontSize: '32px',
                        position: 'absolute',
                        bottom: '20px',
                    }}>
                        Plant
                    </span>
                </div>

                {/* Insect Button */}
                <div onClick={handleInsectClick} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '375px',
                    height: '375px',
                    backgroundColor: '#B3E576',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                    <img src={insectIcon.src} alt="Insect Icon" style={{
                        width: '250px',
                        height: '250px',
                        marginBottom: '10px',
                    }}/>
                    <span style={{
                        color: '#000',
                        fontSize: '32px',
                        position: 'absolute',
                        bottom: '20px',
                    }}>
                        Insect
                    </span>
                </div>
            </div>
        </div>
    );
}
