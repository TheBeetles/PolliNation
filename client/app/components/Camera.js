import React, { useState, useEffect, useRef } from 'react';
import styles from './Camera.module.css';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getDevices = async () => {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    };

    getDevices();
  }, []);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing the camera: ', err);
      }
    }
  };

  useEffect(() => {
    if (selectedDeviceId) {
      startCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedDeviceId]);

  const takePhoto = () => {
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    context.drawImage(videoRef.current, 0, 0, width, height);

    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPhoto(dataUrl);
  };

  const uploadPhoto = async () => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: photo }),
    });

    const result = await response.json();
    console.log(result);
  };

  const retakePhoto = () => {
    setPhoto('');
    startCamera(); // Restart the camera when retaking a photo
  };

  return (
    <div className={styles.container}>
      {!photo && (
        <div>
          <select
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            value={selectedDeviceId}
            className={styles.select}
          >
            {devices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
          <video ref={videoRef} className={styles.video} />
          <button className={styles.button} onClick={takePhoto}>Take Photo</button>
        </div>
      )}
      {photo && (
        <div>
          <img src={photo} alt="Captured" className={styles.image} />
          <button className={styles.button} onClick={uploadPhoto}>Upload Photo</button>
          <button className={styles.button} onClick={retakePhoto}>Retake Photo</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default Camera;
