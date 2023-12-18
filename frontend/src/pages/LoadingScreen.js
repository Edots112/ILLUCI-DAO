import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onFinishedLoading }) => {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const incrementPercentage = () => {
      setPercentage(
        prevPercentage => {
          const randomIncrement = Math.min(
            100 - prevPercentage,
            Math.ceil(Math.random() * 10)
          );
          const newPercentage = prevPercentage + randomIncrement;
          if (newPercentage >= 100) {
            setFade(true);
            setTimeout(() => {
              setLoading(false);
              onFinishedLoading(); // Notify App.js that loading is complete
            }, 2000);
          }
          return newPercentage;
        },
        [percentage]
      );
    };

    const timeout = setTimeout(incrementPercentage, 1000);

    const interval = setInterval(incrementPercentage, 300 + Math.random() * 2);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-green-500 transition-opacity duration-1000 ${
        fade ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <p className="mb-4 font-bold text-8xl text-white">Loading...</p>{' '}
        <p className="text-4xl text-white">{percentage}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
