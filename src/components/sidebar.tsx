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
    <aside className="w-64 bg-background p-3 border-r flex-shrink-0 overflow-y-auto">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="w-full justify-start text-left h-8 px-2 text-sm"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-3 w-3" />
              <span className="truncate">{item.label}</span>
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
