// src/components/footer.tsx
import React from 'react';
import { Mail, Phone, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 flex-shrink-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@soccentric.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>www.soccentric.com</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2025 SOC Configurator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
