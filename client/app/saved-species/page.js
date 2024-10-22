// app/saved-species/saved-species.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import placeholder from '../images/pollination.png';  // Assuming you have a placeholder image
import verifyUser from '../components/verify';
import styles from '../components/Camera.module.css';

export default function SavedSpeciesPage() { 
    const router = useRouter();
    const [data, setData] = useState([]);
    const [plantImage, setPlantImage] = useState([]);
    const [insectImage, setInsectImage] = useState([]);
    const [toggle, setToggle] = useState(false);
    verifyUser();

    const handleGoBackButton = () => { 
        router.push('/scan-species');
    };

    useEffect(() => {
        const res = async () => {
            const val = await fetch('/api/image/all', {
                method: 'GET'
            }).then(
                (r) => { return r.json(); }
            );
            setData(val);
        };
        res();
    }, []);

    useEffect(() => {
        const response = async () => {
            if (data['insect'] !== undefined) {
                for (let i = 0; i < data['insect'].length; i++) {
                    const res = await fetch('/api/image/get/' + data['insect'][i], {
                        method: 'GET'
                    }).then((r) => { return r.blob(); }).then(
                        (thing) => {
                            const objectURL = URL.createObjectURL(thing);
                            insectImage.push({ id: data['insect'][i], image: objectURL });
                        }
                    );
                }
            }
            if (data['plant'] !== undefined) {
                for (let i = 0; i < data['plant'].length; i++) {
                    const res = await fetch('/api/image/get/' + data['plant'][i], {
                        method: 'GET'
                    }).then((r) => { return r.blob(); }).then(
                        (thing) => {
                            const objectURL = URL.createObjectURL(thing);
                            plantImage.push({ id: data['plant'][i], image: objectURL });
                        }
                    );
                }
            }

            setInsectImage([...insectImage]);
        };
        response();
    }, [data]);

    const toggleFalse = () => {
        setToggle(false);
    };
        
    const toggleTrue = () => {
        setToggle(true);
    };

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#F5F5DC' // Beige background
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
            { toggle && 
              <h1 style={{
                  marginBottom: '10px',
                  color: '#006400', // Dark green color
                  fontSize: '28px',  // Larger font size
                  fontWeight: '900', // More bold
                  fontFamily: 'Georgia, serif', // Prettier font
              }}>
                  Plant List
              </h1> 
            }
            { !toggle && 
              <h1 style={{
                  marginBottom: '10px',
                  color: '#006400', // Dark green color
                  fontSize: '28px',  // Larger font size
                  fontWeight: '900', // More bold
                  fontFamily: 'Georgia, serif', // Prettier font
              }}>
                  Insect List
              </h1> 
            }
            <div style={{ display: 'flex' }}>
                <button className={styles.button} onClick={toggleTrue}>
                    Plants
                </button>
                <button className={styles.button} onClick={toggleFalse}>
                    Insects
                </button>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingBottom: '2em',
            }}>
                { toggle &&
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // Set to 4 columns
                    gap: '10px',
                }}>
                    {plantImage.map(plant => (
                        <a href={("species-information/" + plant.id)} key={plant.id}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%', // Circular shape
                            border: '2px solid #B3E576', // Green border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F0F0F0',
                        }}>
                            <img src={plant.image || placeholder} alt="Plant" style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%', // Circular image
                            }}/>
                        </div>
                        </a>
                    ))}
                </div> }
                { !toggle &&
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // Set to 4 columns
                    gap: '10px',
                }}>
                    {insectImage.map(insect => (
                        <a href={("species-information/" + insect.id)} key={insect.id}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%', // Circular shape
                            border: '2px solid #B3E576', // Green border
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F0F0F0',
                        }}>
                            <img src={insect.image || placeholder} alt="Insect" style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%', // Circular image
                            }}/>
                        </div>
                        </a>
                    ))}
                </div>}
            </div>
        </div>
    );
}
