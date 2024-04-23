import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import Drone from './components/drone.jsx';
import Table from './components/table.jsx';
import View from './components/view.jsx';
import Navbar from './components/navbar.jsx';
import User from './components/user.jsx';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoZv_F4xnCugZrnPmOW9evoaOeDVGPnaM",
  authDomain: "ecen-404-dcabe.firebaseapp.com",
  projectId: "ecen-404-dcabe",
  storageBucket: "ecen-404-dcabe.appspot.com",
  messagingSenderId: "833141845065",
  appId: "1:833141845065:web:5dbcf881caf510839a2398",
  measurementId: "G-7MXSBSCHZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 
function App() {
  const [currentPage, setCurrentPage] = useState('view');
  return (
    <>
        <div>
          <button onClick={() => setCurrentPage('table')}>Stats</button> &nbsp;
          <button onClick={() => setCurrentPage('drone')}>Drone Maintance</button>
          {currentPage === 'table' && <Table />}
          {currentPage === 'drone' && <Drone />}
        </div>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drone" element={<Drone />} />
          <Route path="/view" element={<View />} />
          <Route path="/table" element={<Table />} />
          <Route path="/user" element={<User/>} />
 
      </Routes>
    </>

  );
}

export default App;
