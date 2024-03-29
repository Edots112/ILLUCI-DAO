import React from 'react';

const Popup = ({ hrefs, textContent, buttonContent, bg }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${bg} z-50 `}>
      <div className="relative flex flex-col rounded bg-white p-12 font-bolda text-xl text-black ">
        <p className="mb-4">{textContent}</p>
        <button
          className="mt-3 items-center rounded bg-pink-500 px-4 py-2 text-black hover:bg-pink-700"
          onClick={() => (window.location.href = hrefs)}
        >
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

export default Popup;
