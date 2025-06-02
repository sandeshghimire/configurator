"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import ProgressIndicator from '@/components/progress-indicator';
import { useConfigurator } from '@/components/configurator-context';

interface PageLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    stepId: string;
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
    const { completedSteps } = useConfigurator();
    const pathname = usePathname();

    // Extract current step from pathname
    const currentStep = pathname === '/' ? 'home' : pathname.slice(1);

    return (
        <div className="h-full flex flex-col">
            <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} />
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                        {description && (
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
