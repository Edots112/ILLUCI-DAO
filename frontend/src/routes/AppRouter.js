import React from 'react';
import '../styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import NoPage from '../pages/NoPage';
import MintingScreen from '../pages/MintingScreen';
import DashboardScreen from '../pages/DashboardScreen';
import CitadelScreen from '../pages/CitadelScreen';
import UserProfile from '../pages/UserProfile';
import ReadNews from '../pages/ReadNews';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="minting" element={<MintingScreen />} />
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="citadel" element={<CitadelScreen />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="/read-news/:ReadMoreUrl" element={<ReadNews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
