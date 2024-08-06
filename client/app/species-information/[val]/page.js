'use client'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import insectImage from '../../images/insect.png';
import verifyUser from '../../components/verify';

export default function SpeciesInformation({ params }) {
  verifyUser();
  const router = useRouter();
  const [image, setImage] = useState('');
  const route = '/api/image/get/' + params.val;

  useEffect(() => {
    const response = async () => {
        const res = await fetch(route, {
          method: 'GET'
        }).then((r) => {return r.blob();}).then(
          (thing) => {
            const objectURL = URL.createObjectURL(thing);
            setImage(objectURL);
          }
        );
    };
    response();
  }, []); 
  return (
    <>
      <Head>
        <title>Species Information</title>
        <meta name="description" content="Information about the Spotted Lanternfly" />
      </Head>
      <div className="species-container">
        <header className="header">
          <Link href="/">
            {/* <a className="back-button">←</a> */}
          </Link>
          <h1>Spotted Lanternfly</h1>
          <p>Invasive Species in <span className="location">Albany, NY</span></p>
        </header>
        <img
          src={image}
          alt="Spotted Lanternfly"
          width={800}
          height={450}
          className="main-image"
        />
        <div className="content">
          <section className="about">
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.</p>
          </section>
          <section className="action">
            <h2>Take Action</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.</p>
            <Link href="#">
              {/* <a className="learn-more">Learn More</a> */}
            </Link>
          </section>
        </div>
      </div>
      <style jsx>{`
        .species-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 24px;
          text-decoration: none;
        }
        .header h1 {
          margin-top: 0;
        }
        .location {
          color: red;
          font-weight: bold;
        }
        .main-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .content {
          padding: 20px;
        }
        .about, .action {
          margin-bottom: 20px;
        }
        .learn-more {
          display: inline-block;
          margin-top: 10px;
          color: blue;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
