"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ContactInfo {
    fullName?: string;
    email?: string;
    companyName?: string;
    phoneNumber?: string;
    projectDescription?: string;
}

interface FormData {
    industryFocus?: string;
    otherIndustry?: string;
    corePlatforms?: string[];
    operatingSystem?: string;
    keyFeatures?: string[];
    hardwareRequirements?: string[];
    middlewareFrameworks?: string[];
    driverNeeds?: string[];
    cloudPlatforms?: string[];
    iotIntegration?: string;
    dataProcessing?: string[];
    cloudStrategy?: string;
    contactInfo?: ContactInfo;
}

interface ConfiguratorContextType {
    formData: FormData;
    updateFormData: <T extends keyof FormData>(section: T, data: FormData[T]) => void;
    completedSteps: string[];
    markStepCompleted: (stepId: string) => void;
    resetForm: () => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export function ConfiguratorProvider({ children }: { children: React.ReactNode }) {
    const [formData, setFormData] = useState<FormData>({});
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('configurator-form-data');
        const savedSteps = localStorage.getItem('configurator-completed-steps');

        if (savedData) {
            try {
                setFormData(JSON.parse(savedData) as FormData);
            } catch (error) {
                console.error('Error loading saved form data:', error);
            }
        }

        if (savedSteps) {
            try {
                setCompletedSteps(JSON.parse(savedSteps) as string[]);
            } catch (error) {
                console.error('Error loading saved steps:', error);
            }
        }
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('configurator-form-data', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        localStorage.setItem('configurator-completed-steps', JSON.stringify(completedSteps));
    }, [completedSteps]);

    const updateFormData = useCallback(<T extends keyof FormData>(section: T, data: FormData[T]) => {
        setFormData(prev => ({
            ...prev,
            [section]: data
        }));
    }, []);

    const markStepCompleted = useCallback((stepId: string) => {
        setCompletedSteps(prev => {
            if (!prev.includes(stepId)) {
                return [...prev, stepId];
            }
            return prev;
        });
    }, []);

    const resetForm = () => {
        setFormData({});
        setCompletedSteps([]);
        localStorage.removeItem('configurator-form-data');
        localStorage.removeItem('configurator-completed-steps');
    };

    return (
        <ConfiguratorContext.Provider
            value={{
                formData,
                updateFormData,
                completedSteps,
                markStepCompleted,
                resetForm
            }}
        >
            {children}
        </ConfiguratorContext.Provider>
    );
}

export function useConfigurator() {
    const context = useContext(ConfiguratorContext);
    if (context === undefined) {
        throw new Error('useConfigurator must be used within a ConfiguratorProvider');
    }
    return context;
}
