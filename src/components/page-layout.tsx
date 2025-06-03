"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ProgressIndicator from '@/components/progress-indicator';
import { useConfigurator } from '@/components/configurator-context';
import { pageVariants, pageTransition } from '@/lib/animations';

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
            <motion.div
                className="flex-1 p-6 overflow-y-auto"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
            >
                <div className="w-full">
                    <motion.div
                        className="text-center mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
                        {description && (
                            <p className="text-sm text-gray-600 max-w-2xl mx-auto">{description}</p>
                        )}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
