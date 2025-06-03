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
    title?: string;
    description?: string;
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
    getCompletionPercentage: () => number;
    validateCurrentStep: (stepId: string) => boolean;
    exportConfiguration: () => string;
    importConfiguration: (jsonData: string) => boolean;
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
        setFormData(prev => {
            const newFormData = {
                ...prev,
                [section]: data
            };

            // Auto-save to localStorage with debounce
            setTimeout(() => {
                localStorage.setItem('configurator-form-data', JSON.stringify(newFormData));
            }, 500);

            return newFormData;
        });
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

    const getCompletionPercentage = useCallback(() => {
        const totalSteps = 10; // Total number of configuration steps
        return Math.round((completedSteps.length / totalSteps) * 100);
    }, [completedSteps]);

    const validateCurrentStep = useCallback((stepId: string) => {
        const { validateStep } = require('@/lib/validation');
        const result = validateStep(stepId, formData);
        return result.success;
    }, [formData]);

    const exportConfiguration = useCallback(() => {
        const exportData = {
            formData,
            completedSteps,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
        return JSON.stringify(exportData, null, 2);
    }, [formData, completedSteps]);

    const importConfiguration = useCallback((jsonData: string) => {
        try {
            const importedData = JSON.parse(jsonData);
            if (importedData.formData && importedData.completedSteps) {
                setFormData(importedData.formData);
                setCompletedSteps(importedData.completedSteps);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to import configuration:', error);
            return false;
        }
    }, []);

    return (
        <ConfiguratorContext.Provider
            value={{
                formData,
                updateFormData,
                completedSteps,
                markStepCompleted,
                resetForm,
                getCompletionPercentage,
                validateCurrentStep,
                exportConfiguration,
                importConfiguration
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
