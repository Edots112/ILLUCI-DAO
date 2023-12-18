import React, { useState } from 'react';
import Home from './pages/Home';
import LoadingScreen from './pages/LoadingScreen';
import './styles/index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="h-[100vh]">
      {isLoading && <LoadingScreen onFinishedLoading={handleLoadingComplete} />}
      {!isLoading && <Home />}
    </main>
  );
}

export default App;
