import React, { useState } from 'react';
import Home from './pages/Home';
import LoadingScreen from './pages/LoadingScreen';
import './styles/index.css';
import AppRouter from './routes/AppRouter';

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // const handleLoadingComplete = () => {
  //   setIsLoading(false);
  // };

  return (
    <main className="h-[100vh]">
      {/* <LoadingScreen /> */}
      <AppRouter />
    </main>
  );
}

export default App;
