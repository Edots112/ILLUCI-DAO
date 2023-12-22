import React from 'react';
import '../styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import NoPage from '../pages/NoPage';
import MintingScreen from '../pages/MintingScreen';
import DashboardScreen from '../pages/DashboardScreen';
import Staking from '../components/Staking';
import Citadel from '../components/Citadel';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardScreen />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="minting" element={<MintingScreen />} />
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="staking" element={<Staking />} />
          <Route path="citadel" element={<Citadel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
