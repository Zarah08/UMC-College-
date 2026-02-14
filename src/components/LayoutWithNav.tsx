import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const LayoutWithNav: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
