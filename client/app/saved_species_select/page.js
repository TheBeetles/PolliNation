// app/saved-species/saved-species.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import placeholder from '../images/pollination.png';
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
