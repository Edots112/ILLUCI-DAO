import React from 'react';
import '../styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import NoPage from '../pages/NoPage';
import MintingScreen from '../pages/MintingScreen';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="minting" element={<MintingScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
