"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Database, Monitor, Globe, Smartphone, AlertTriangle, BarChart3, Wifi } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const KeyApplicationFeaturesPage = () => {
    const router = useRouter();
    const { formData, updateFormData, markStepCompleted } = useConfigurator();
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(formData.keyFeatures || []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const features = [
        {
            value: 'Over-The-Air (OTA) Updates',
            title: 'Over-The-Air (OTA) Updates',
            icon: Wifi,
            description: 'Remote firmware and software updates without physical access. Enables continuous improvement, bug fixes, and feature additions throughout product lifecycle. Requires secure update mechanisms and rollback capabilities.'
        },
        {
            value: 'Real-time Performance Monitoring & Diagnostics',
            title: 'Real-time Performance Monitoring & Diagnostics',
            icon: BarChart3,
            description: 'Continuous system health monitoring including CPU usage, memory, temperature, and custom metrics. Enables predictive maintenance and performance optimization. Essential for mission-critical applications.'
        },
        {
            value: 'Alarm & Fault Management System',
            title: 'Alarm & Fault Management System',
            icon: AlertTriangle,
            description: 'Automated detection, classification, and notification of system faults and abnormal conditions. Includes configurable thresholds, escalation procedures, and fault logging for troubleshooting and compliance.'
        },
        {
            value: 'Data Logging & Analytics',
            title: 'Data Logging & Analytics',
            icon: Database,
            description: 'Systematic collection, storage, and analysis of operational data. Supports historical trending, performance analysis, and regulatory compliance. Includes local storage and cloud synchronization options.'
        },
        {
            value: 'Local User Interface (UI/UX)',
            title: 'Local User Interface (UI/UX)',
            icon: Monitor,
            description: 'On-device user interface for direct interaction via touchscreen, buttons, or display. Includes configuration menus, status displays, and control interfaces. Requires UI framework and display hardware integration.'
        },
        {
            value: 'Web-based Control/Monitoring Dashboard',
            title: 'Web-based Control/Monitoring Dashboard',
            icon: Globe,
            description: 'Browser-accessible interface for remote monitoring and control. Enables multi-user access, responsive design for various devices, and integration with existing IT infrastructure. Requires web server and security features.'
        },
        {
            value: 'Mobile Application Integration',
            title: 'Mobile Application Integration',
            icon: Smartphone,
            description: 'Smartphone/tablet app connectivity via Bluetooth, Wi-Fi, or cellular. Provides portable monitoring, configuration, and control capabilities. Includes API development and mobile app frameworks.'
        },
        {
            value: 'Secure Boot & Device Security',
            title: 'Secure Boot & Device Security',
            icon: Shield,
            description: 'Cryptographic verification of firmware integrity, secure key storage, and protection against tampering. Essential for critical applications and regulatory compliance. Includes hardware security modules and encryption.'
        }
    ];

    const handleFeatureToggle = (featureValue: string) => {
        setSelectedFeatures(prev => {
            if (prev.includes(featureValue)) {
                return prev.filter(f => f !== featureValue);
            } else {
                return [...prev, featureValue];
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFeatures.length === 0) return;

        setIsSubmitting(true);

        // Update form data
        updateFormData('keyFeatures', selectedFeatures);

        // Mark step as completed
        markStepCompleted('key-application-features');

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 500));

        setIsSubmitting(false);
        router.push('/hardware-peripheral-requirements');
    };

    const isFormValid = selectedFeatures.length > 0;

    return (
        <PageLayout
            title="Select Key Application Features"
            description="Choose the essential features and capabilities your embedded system needs. Select all that apply to your project requirements."
            stepId="key-application-features"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        const isSelected = selectedFeatures.includes(feature.value);

                        return (
                            <Card
                                key={feature.value}
                                className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${isSelected
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => handleFeatureToggle(feature.value)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <Checkbox
                                            id={feature.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                                            checked={isSelected}
                                            onChange={() => { }} // Handled by card onClick
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                    <IconComponent className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                                                </div>
                                                <Label
                                                    htmlFor={feature.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                                                    className="font-semibold text-lg cursor-pointer"
                                                >
                                                    {feature.title}
                                                </Label>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="flex justify-end pt-6">
                    <Button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                Continue to Hardware Requirements
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </PageLayout>
    );
};

export default KeyApplicationFeaturesPage;
