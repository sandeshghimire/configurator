"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { progressVariants, fadeInVariants } from '@/lib/animations';

interface ProgressIndicatorProps {
    currentStep: string;
    completedSteps: string[];
}

const steps = [
    { id: 'home', title: 'Welcome', href: '/' },
    { id: 'industry-focus', title: 'Industry', href: '/industry-focus' },
    { id: 'core-platform-selection', title: 'Platform', href: '/core-platform-selection' },
    { id: 'operating-system-choice', title: 'OS', href: '/operating-system-choice' },
    { id: 'key-application-features', title: 'Features', href: '/key-application-features' },
    { id: 'hardware-peripheral-requirements', title: 'Hardware', href: '/hardware-peripheral-requirements' },
    { id: 'middleware-frameworks', title: 'Middleware', href: '/middleware-frameworks' },
    { id: 'driver-development-needs', title: 'Drivers', href: '/driver-development-needs' },
    { id: 'cloud-connectivity-strategy', title: 'Cloud', href: '/cloud-connectivity-strategy' },
    { id: 'contact-information', title: 'Contact', href: '/contact-information' },
    { id: 'review-submit', title: 'Review', href: '/review-submit' },
];

export default function ProgressIndicator({ currentStep, completedSteps }: ProgressIndicatorProps) {
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);

    return (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-sm font-medium text-gray-900">
                            Configuration Progress
                        </h2>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                                Step {currentStepIndex + 1} of {steps.length}
                            </span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-1">
                        {steps.map((step, index) => {
                            const isCompleted = completedSteps.includes(step.id);
                            const isCurrent = step.id === currentStep;
                            const isAccessible = index <= currentStepIndex || isCompleted;

                            return (
                                <div key={step.id} className="flex items-center">
                                    {isAccessible ? (
                                        <Link href={step.href}>
                                            <button
                                                className={cn(
                                                    "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors",
                                                    isCurrent
                                                        ? "bg-blue-600 text-white"
                                                        : isCompleted
                                                            ? "bg-green-600 text-white"
                                                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                )}
                                                title={step.title}
                                            >
                                                {isCompleted ? (
                                                    <CheckCircle className="w-4 h-4" />
                                                ) : (
                                                    <span>{index + 1}</span>
                                                )}
                                            </button>
                                        </Link>
                                    ) : (
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium bg-gray-100 text-gray-400"
                                            title={step.title}
                                        >
                                            <span>{index + 1}</span>
                                        </div>
                                    )}
                                    {index < steps.length - 1 && (
                                        <div className="w-8 h-px bg-gray-200 mx-1" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
