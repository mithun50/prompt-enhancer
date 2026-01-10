import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ showCTA = true }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/enhance');
  };

  return (
    <header className="w-full flex justify-center fixed top-2 sm:top-6 lg:top-15 left-0 z-10 px-4">
      <div className="w-full max-w-sm sm:max-w-3xl">
        <div className="flex items-center justify-between rounded-md border border-white/60 px-4 sm:px-6 py-2 sm:py-2.5 shadow-[0_25px_50px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
          <span className="kant-700 text-xl sm:text-3xl text-white tracking-wide">Eleva</span>
          {showCTA && (
            <button
              onClick={handleNavigate}
              className="kant-400 text-sm sm:text-md text-white/95 px-3 sm:px-4 py-1 sm:py-1.5 rounded-md border border-white/40 shadow-[0_8px_18px_rgba(13,49,58,0.4)] transition-all hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Evaluate &gt;
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;