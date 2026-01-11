import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ showCTA = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    if (location.pathname === '/enhance') {
      navigate('/');
    } else {
      navigate('/enhance');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="w-full flex justify-center fixed top-3 sm:top-4 md:top-5 lg:top-6 left-0 z-50 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="flex items-center justify-between rounded-xl border border-[#317F84]/30 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl bg-[#1a3a3a]/80">
          <span
            onClick={handleLogoClick}
            className="kant-700 text-xl sm:text-2xl md:text-3xl text-white tracking-wide cursor-pointer hover:text-[#BDE8DC] transition-colors"
          >
            Eleva
          </span>
          {showCTA && (
            <button
              onClick={handleNavigate}
              className="kant-400 text-xs sm:text-sm md:text-base text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg border border-[#317F84]/40 bg-[#317F84]/30 hover:bg-[#317F84]/50 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#BDE8DC]/40"
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
