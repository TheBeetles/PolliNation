'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function ScanInsect() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <Link href="/scan-species">
        {/* <a className="back-button">← Back</a> */}
      </Link>
      <h1>Take Photo or Choose Existing Image</h1>
      <div className="image-container">
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className="selected-image" />
        ) : (
          <div className="placeholder">
            <img src="../images/pollination.png" alt="Placeholder" className="placeholder-image" />
            <p>No Image Selected</p>
          </div>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button className="scan-button">Scan Image</button>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background-color: #fff;
        }
        .back-button {
          align-self: flex-start;
          font-size: 16px;
          text-decoration: none;
          color: #000;
          margin-bottom: 20px;
        }
        h1 {
          margin-bottom: 20px;
        }
        .image-container {
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .placeholder, .selected-image {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .placeholder-image {
          max-width: 100%;
          max-height: 100%;
        }
        .placeholder p {
          margin: 10px 0 0;
          color: #888;
        }
        input[type="file"] {
          margin-bottom: 20px;
        }
        .scan-button {
          padding: 10px 20px;
          background-color: #a6e22e;
          border: none;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
