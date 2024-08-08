// app/saved-species/saved-species.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import placeholder from '../images/pollination.png';
import verifyUser from '../components/verify';

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
        }
        res();
    },[]);

    useEffect(() => {
        const response = async () => {
            if (data['insect'] !== undefined) {
              for (let i = 0; i < data['insect'].length; i++) {
                const res = await fetch('/api/image/get/' + data['insect'][i], {
                  method: 'GET'
                }).then((r) => {return r.blob();}).then(
                  (thing) => {
                    const objectURL = URL.createObjectURL(thing);
                        insectImage.push({ id: data['insect'][i], image: objectURL});
                  }
                );
              }
            }
            if (data['plant'] !== undefined) {
              for (let i = 0; i < data['plant'].length; i++) {
                const res = await fetch('/api/image/get/' + data['plant'][i], {
                  method: 'GET'
                }).then((r) => {return r.blob();}).then(
                  (thing) => {
                    const objectURL = URL.createObjectURL(thing);
                        plantImage.push({ id: data['plant'][i], image: objectURL});
                      // setPlantImage([...plantImage, { id: data['plant'][i], image: objectURL}]);
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
    }
        
    const toggleTrue = () => {
        setToggle(true);
    }
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
            { toggle && <h1 style={{
                marginBottom: '10px',
                color: '#2E8B57',
                fontSize: '24px',
            }}>
                Plants List
            </h1>}
            { !toggle && <h1 style={{
                marginBottom: '10px',
                color: '#2E8B57',
                fontSize: '24px',
            }}>
                Insect List
            </h1>}
                <button onClick={toggleTrue} style={{
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '10px',
                }}>
                    Plants
                </button>
                <button onClick={toggleFalse} style={{
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '10px',
                }}>
                    Insects
                </button>
            <div style={{
                display: 'flex',
                width: '100%',
                paddingBottom: '2em',
            }}>
                { toggle &&
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                }}>
                    {/* Placeholder images for Plants */}
                    {plantImage.map(plant => (
                        <a href={("species-information/" + plant.id)}>
                        <div key={plant.id} style={{
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
                            <img src={plant.image} alt="Insect" style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}/>
                        </div>
                        </a>
                    ))}
                </div> }
                { !toggle &&
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                }}>
                    {/* Placeholder images for Insects */}
                    {insectImage.map(insect => (
                        <a href={("species-information/" + insect.id)}>
                        <div key={insect.id} style={{
                            width: '100px',
                            height: '100px',
                            border: '2px solid #000000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                        }}>
                            <img src={insect.image} alt="Insect" style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}/>
                        </div>
                        </a>
                    ))}
                </div>}
            </div>
        </div>
    );
}
