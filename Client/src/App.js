import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
// import Offer from './components/Offer/Offer';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Registration from './components/Registration/Register';
import Login from './components/Login/Login';
import Background from "./components/background/background"; // Import Background
import WhatsComing from './components/WhatsComing/WhatsComing';
import FinalCTA from './components/FinalCTA/FinalCTA';
import Teams from './components/Team/teams';
import Profile from './components/Profile/Profile';
import Viewers from './components/ForViewers/Viewers';
import Artists from './components/ForArtists/Artists';
import Writers from './components/ForWriters/Writers';
import { Logout } from './components/Login/Logout';

function App() {
  return (
    <div className="App">
      <Background /> {/* Background animation applied globally */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/sign-up" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/for-viewers" element={<Viewers />} />
          <Route exact path="/for-artists" element={<Artists />} />
          <Route exact path="/for-writers" element={<Writers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Teams />
      <WhatsComing />
      <FinalCTA />
    </>
  );
};



export default App;
