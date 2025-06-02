// src/components/sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useConfigurator } from '@/components/configurator-context';
import {
  Home,
  Briefcase,
  Cpu,
  TerminalSquare,
  Zap,
  HardDrive,
  Layers,
  Settings,
  Cloud,
  Mail,
  CheckSquare,
  ChevronRight,
  Check,
  Download,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const { completedSteps } = useConfigurator();

  const menuItems = [
    { href: '/', label: 'Welcome', icon: Home, id: 'home' },
    { href: '/industry-focus', label: 'Industry Focus', icon: Briefcase, id: 'industry-focus' },
    { href: '/core-platform-selection', label: 'Core Platform', icon: Cpu, id: 'core-platform-selection' },
    { href: '/operating-system-choice', label: 'Operating System', icon: TerminalSquare, id: 'operating-system-choice' },
    { href: '/key-application-features', label: 'Key Features', icon: Zap, id: 'key-application-features' },
    { href: '/hardware-peripheral-requirements', label: 'Hardware & Peripherals', icon: HardDrive, id: 'hardware-peripheral-requirements' },
    { href: '/middleware-frameworks', label: 'Middleware & Frameworks', icon: Layers, id: 'middleware-frameworks' },
    { href: '/driver-development-needs', label: 'Driver Development', icon: Settings, id: 'driver-development-needs' },
    { href: '/cloud-connectivity-strategy', label: 'Cloud & Connectivity', icon: Cloud, id: 'cloud-connectivity-strategy' },
    { href: '/contact-information', label: 'Contact Information', icon: Mail, id: 'contact-information' },
    { href: '/review-submit', label: 'Review & Submit', icon: CheckSquare, id: 'review-submit' },
    { href: '/import-export', label: 'Import / Export', icon: Download, id: 'import-export' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Configuration Steps</h2>
          <p className="text-sm text-gray-500">Complete each step to build your configuration</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            const isCompleted = completedSteps.includes(item.id);
            const stepNumber = index + 1;

            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-auto p-3 hover:bg-gray-50 group relative",
                  isActive && "bg-blue-50 text-blue-700 hover:bg-blue-50"
                )}
                asChild
              >
                <Link href={item.href} className="flex items-center space-x-3">
                  {/* Step Number / Completion Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                    isCompleted
                      ? "bg-green-100 text-green-700"
                      : isActive
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                  )}>
                    {isCompleted ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span>{stepNumber}</span>
                    )}
                  </div>

                  {/* Icon */}
                  <item.icon className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )} />

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "text-xs font-medium block truncate",
                      isActive ? "text-blue-700" : "text-gray-700"
                    )}>
                      {item.label}
                    </span>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Progress Summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Progress</span>
            <span className="text-xs text-gray-500">
              {completedSteps.length}/{menuItems.length - 1}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedSteps.length / (menuItems.length - 1)) * 100}%`
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {completedSteps.length === menuItems.length - 1
              ? "Configuration complete! 🎉"
              : "Keep going to complete your configuration"
            }
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
