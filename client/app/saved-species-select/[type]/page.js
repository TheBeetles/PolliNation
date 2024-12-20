// app/saved-species/saved-species.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import placeholder from '../../images/pollination.png';
import BackButton from '../../components/BackButton'
import verifyUser from '../../components/verify';
import React from 'react';

import { useParams } from 'next/navigation';

export default function SavedSpeciesPage() { 
    const router = useRouter();
    const type = useParams();
    const toggle = type.type === 'plant' ? true : false;

    const [data, setData] = useState([]);
    const [plantImage, setPlantImage] = useState([]);
    const [insectImage, setInsectImage] = useState([]);
    verifyUser();

    const handleGoBackButton = () => { 
        router.push('../saved-species');
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
                    }).then((r) => r.blob()).then(
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
                    }).then((r) => r.blob()).then(
                        (thing) => {
                            const objectURL = URL.createObjectURL(thing);
                            plantImage.push({ id: data['plant'][i], image: objectURL });
                        }
                    );
                }
            }
            setInsectImage([...insectImage]);
            setPlantImage([...plantImage]);
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
            <BackButton onClick={handleGoBackButton}/>
            { toggle && <h1 style={{
                marginBottom: '20px',
                color: '#000',
                fontSize: '45px',
                fontFamily: 'Verdana, sans-serif',
            }}>
                Plant List
            </h1>}
            { !toggle && <h1 style={{
                marginBottom: '20px',
                color: '#000',
                fontSize: '45px',
                fontFamily: 'Verdana, sans-serif',
            }}>
                Insect List
            </h1>}
            <div style={{ display: 'flex' }}>
                {/* <button className={styles.button} onClick={toggleTrue} style={{
                }}>
                    Plants
                </button>
                <button className={styles.button} onClick={toggleFalse} style={{
                }}>
                    Insects
                </button> */}
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
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                }}>
                    {plantImage.map(plant => (
                        <a href={("../species-information/" + plant.id)}>
                        <div key={plant.id} style={{
                            width: '100px',
                            height: '100px',
                            border: '2px solid #B3E576',
                            borderRadius: '50%',
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
                                borderRadius: '50%',
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
                    {insectImage.map(insect => (
                        <a href={("../species-information/" + insect.id)}>
                        <div key={insect.id} style={{
                            width: '100px',
                            height: '100px',
                            border: '2px solid #B3E576',
                            borderRadius: '50%',
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
                                borderRadius: '50%',
                            }}/>
                        </div>
                        </a>
                    ))}
                </div>}
            </div>
        </div>
    );
}

