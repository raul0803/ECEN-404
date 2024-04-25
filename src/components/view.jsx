import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import ROSLIB from 'roslib';
import { firestore } from './firebase.jsx';


// Function to convert array buffer to base64-encoded string
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

function View() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [lidarData, setLidarData] = useState([]);
  const [rosMessage, setRosMessage] = useState(null);
  const [stopMessage, setStopMessage] = useState(true);
  const [rosImage, setRosImage] = useState(null); // Define rosImage state
  const [displayMessage, setDisplayMessage] = useState(false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  const ros = useRef(new ROSLIB.Ros({ url: 'ws://10.224.153.75:9090' }));
  const listener = useRef(null);

  useEffect(() => {
    if (ros.current) {
      listener.current = new ROSLIB.Topic({
        ros: ros.current,
        name: '/camera/image_raw',
        messageType: 'sensor_msgs/Image'
      });
      listener.current.subscribe(message => {
        const imageData = message.data;
        const width = message.width;
        const height = message.height;
        const format = message.format;
        let dataURL;
        if (format === 'jpeg' || format === 'png') {
          // If image is compressed (JPEG or PNG), create data URL directly
          dataURL = `data:image/${format};base64,${arrayBufferToBase64(imageData)}`;
        } else if (format === 'raw') {
          // If image is raw, create canvas and draw image data
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          const imageDataUint8 = new Uint8Array(imageData);
          const imageDataClamped = new ImageData(imageDataUint8, width, height);
          ctx.putImageData(imageDataClamped, 0, 0);
          dataURL = canvas.toDataURL(`image/${format}`);
        }

        setRosImage(dataURL);
      });
    }


    ros.current.on('error', (error) => {
      console.error('WebSocket error:', error);
      //setLidarData([]);
    });


    return () => {
      listener.current.unsubscribe();
    };
  }, []);

  const openFoxgloveApp = () => {
    window.open("https://app.foxglove.dev/raul-cruz/view?layoutId=bd469e85-13e1-49e9-ab02-56a483884c9c", "_blank");
  };

  useEffect(() => {
    if (Array.isArray(lidarData) && lidarData.length > 0) {
      const lidarPointCloud = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(lidarData.map(point => new THREE.Vector3(point.x, point.y, point.z))),
        new THREE.PointsMaterial({ color: 0x00ff00, size: 0.1 })
      );

      scene.clear();
      scene.add(lidarPointCloud);
      camera.position.z = 5;
      renderer.render(scene, camera);
    }
  }, [lidarData]);

  const takePhoto = () => {
    if (videoRef.current) {
      const width = 414;
      const height = width / (16 / 9);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      const dataURL = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "snapshot.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };
  const displayRosMessage = () => {
    setDisplayMessage(true);
  };

  return (
    <div className="App">
      <div className="Camera">
        <canvas ref={photoRef}></canvas>
        <div style={{ position: "relative" }}>
          {rosImage && <img src={rosImage} alt="RosImage" />}
          <video ref={videoRef} autoPlay playsInline></video>
        </div>
        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600dark:hover:bg-gray-700"
          onClick={displayRosMessage}
          style={{ marginBottom: "10px" }}
        >
          Camera
        </button>
        &nbsp;&nbsp;

        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600dark:hover:bg-gray-700"
          onClick={takePhoto}
        >
          Snap
        </button>
        &nbsp;&nbsp;
        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600dark:hover:bg-gray-700"
          onClick={stopVideo}
        >

          End
        </button>
        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600dark:hover:bg-gray-700"
          onClick={openFoxgloveApp} // Bind Foxglove link function to button click event
        >
          Foxglove
        </button>
        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus"
        >
          LiDar
        </button>


        {displayMessage && rosMessage && (
          <div>
            <h3 className='text-3xl font-bold tracking-tight text-gray-900'>ROS Message: </h3>
            <pre className='text-3xl font-bold tracking-tight text-gray-900'>{stopMessage ? JSON.stringify(rosMessage, null, 2) : ''}</pre>
          </div>
        )}
        <button
          onClick={() => setStopMessage(false)}
        >
          End
        </button>
      </div>
    </div>
  );
}

export default View;