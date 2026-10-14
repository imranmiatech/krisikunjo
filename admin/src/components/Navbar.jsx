import React from 'react';

const Navbar = ({ setToken, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className='sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all w-full'>
      <div className='flex items-center justify-between py-3 px-3.5 sm:px-8 w-full'>
        {/* Left: Hamburger Button (Mobile) & Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

          {/* Brand Logo & Tag */}
          <div className="flex items-baseline gap-1 group">
            <span className="text-lg sm:text-2xl font-black tracking-widest text-slate-900">
              TEXHUNT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
          </div>

          <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest bg-slate-900 text-white px-2 py-0.5 rounded-md shadow-xs">
            Admin
          </span>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>API :4000</span>
          </div>

          {/* Admin User Info */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">Master Admin</span>
              <span className="text-[10px] text-slate-400 leading-tight">admin@gmail.com</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setToken('')}
            className='flex items-center gap-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition-all px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-semibold tracking-wider uppercase'
            title="Sign out of Admin Session"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;