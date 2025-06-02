// src/components/header.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Settings, HelpCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigurator } from '@/components/configurator-context';

const Header = () => {
  const { resetForm } = useConfigurator();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all configurations? This action cannot be undone.')) {
      resetForm();
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg flex-shrink-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SOC Configurator</h1>
                <p className="text-blue-200 text-sm">Embedded System Configuration Tool</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-800"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-800"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
