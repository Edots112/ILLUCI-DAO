import React from 'react';
const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
  </div>
);

export default Loader;
