import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Camera.module.css';

const Camera = () => {
  const router = useRouter();
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
    var query = ''
    if (window.location.pathname === "/scan-plant") {
      query = 'plant';
    } else {
      query = 'insect';
    }
    const response = await fetch('/api/image/' + query + '/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/png'
      },
        body: photo
    });
    const data = await response.json();
    if (response.ok) {
      router.push("/species-information/insect-information/" + data['image']);
    } else {
      console.log(response);
    }
  };

  const retakePhoto = () => {
    setPhoto('');
    startCamera(); // Restart the camera when retaking a photo
  };

  return (
    <div className={styles.container}>
      {!photo && (
        <div className={styles.wrapper}>
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
        <div className={styles.wrapper}>
          <img src={photo} alt="Captured" className={styles.image} />
          <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={uploadPhoto}>Upload Photo</button>
            <button className={styles.button} onClick={retakePhoto}>Retake Photo</button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default Camera;
