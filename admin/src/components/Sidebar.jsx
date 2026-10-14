import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const closeSidebar = () => {
    if (setSidebarOpen) setSidebarOpen(false);
  };

  const navLinks = [
    {
      to: '/list',
      title: 'Products List',
      sub: 'Catalog inventory',
      icon: (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
        />
      ),
    },
    {
      to: '/add',
      title: 'Add Garment',
      sub: 'New product drop',
      icon: <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />,
    },
    {
      to: '/orders',
      title: 'All Orders',
      sub: 'Dispatch & customer',
      icon: (
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
        />
      ),
    },
  ];

  return (
    <>
      {/* 1. Desktop Static Sidebar */}
      <aside className='hidden md:flex w-64 min-h-[calc(100vh-65px)] border-r border-slate-200/80 bg-white flex-col justify-between py-6 flex-shrink-0'>
        <div className='flex flex-col gap-1.5 px-4'>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
            Store Management
          </p>

          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`
              }
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <svg className='w-5 h-5 flex-shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                  {item.icon}
                </svg>
              </div>
              <div className='flex flex-col text-left'>
                <span className='text-xs font-bold tracking-wide uppercase'>{item.title}</span>
                <span className='text-[10px] opacity-70 font-normal'>{item.sub}</span>
              </div>
            </NavLink>
          ))}
        </div>

        <div className='px-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400'>
          <p className="font-semibold text-slate-600">TexHunt Studio</p>
          <p>Dashboard v2.4 Active</p>
        </div>
      </aside>

      {/* 2. Mobile Drawer & Backdrop */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          ></div>

          {/* Slide-out Drawer */}
          <div className="relative w-64 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col justify-between p-5 z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black tracking-widest text-slate-900">TEXHUNT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`
                    }
                  >
                    <svg className='w-5 h-5 flex-shrink-0' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                      {item.icon}
                    </svg>
                    <div className='flex flex-col text-left'>
                      <span className='text-xs font-bold uppercase'>{item.title}</span>
                      <span className='text-[10px] opacity-70'>{item.sub}</span>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-700">TexHunt Admin Panel</p>
              <p>Mobile Control Edition</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Mobile Sticky Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-4 flex justify-around items-center shadow-lg">
        {navLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
                isActive
                  ? 'text-slate-900 font-extrabold'
                  : 'text-slate-400 font-medium hover:text-slate-700'
              }`
            }
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
              {item.icon}
            </svg>
            <span className='text-[10px] tracking-tight uppercase'>{item.title.split(' ')[0]}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;