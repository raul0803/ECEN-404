import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home.jsx';
import Drone from './components/drone.jsx';
import View from './components/view.jsx';
import Navbar from './components/navbar.jsx';
import User from './components/user.jsx';


function App() {
  const [currentPage, setCurrentPage] = useState('view');
  return (
    <>
        <div>
          <button onClick={() => setCurrentPage('table')}>Stats</button> &nbsp;
          <button onClick={() => setCurrentPage('drone')}>Drone Maintance</button>
          {currentPage === 'drone' && <Drone />}
        </div>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drone" element={<Drone />} />
          <Route path="/view" element={<View />} />
          <Route path="/user" element={<User/>} />
 
      </Routes>
    </>

  );
}

export default App;
