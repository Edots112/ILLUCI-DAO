import React, { useEffect, useState } from 'react';
import './styles/index.css';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <main className="h-[100vh]">
      <AppRouter />
    </main>
  );
}

export default App;
