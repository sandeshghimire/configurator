// src/components/header.tsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-3 flex-shrink-0">
      <div className="container mx-auto">
        <h1 className="text-lg font-semibold">SOC Configurator</h1>
      </div>
    </header>
  );
};

export default Header;
