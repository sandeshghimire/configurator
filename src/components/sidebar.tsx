// src/components/sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming Button is a Shadcn UI component
import { Home, Briefcase, Cpu, TerminalSquare, Zap, Layers, Settings, Cloud, Mail, CheckSquare } from 'lucide-react'; // Example icons

const Sidebar = () => {
  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/industry-focus', label: 'Industry Focus', icon: Briefcase },
    { href: '/core-platform-selection', label: 'Core Platform Selection', icon: Cpu },
    { href: '/operating-system-choice', label: 'Operating System Choice', icon: TerminalSquare },
    { href: '/key-application-features', label: 'Key Application Features', icon: Zap },
    { href: '/hardware-peripheral-requirements', label: 'Hardware/Peripheral Requirements', icon: Layers },
    { href: '/middleware-frameworks', label: 'Middleware/Frameworks', icon: Settings },
    { href: '/driver-development-needs', label: 'Driver Development Needs', icon: Settings }, // Consider a different icon
    { href: '/cloud-connectivity-strategy', label: 'Cloud Connectivity Strategy', icon: Cloud },
    { href: '/contact-information', label: 'Contact Information', icon: Mail },
    { href: '/review-submit', label: 'Review & Submit', icon: CheckSquare },
  ];

  return (
    <aside className="w-72 bg-background p-4 border-r h-screen flex flex-col">
      <div className="mb-4 p-2">
        {/* You can add a logo or title here if you like */}
        <h2 className="text-xl font-semibold">Configurator</h2>
      </div>
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href} className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      {/* You can add a footer or user profile section here if needed */}
    </aside>
  );
};

export default Sidebar;
