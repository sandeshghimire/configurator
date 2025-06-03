import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { validateStep } from '@/lib/validation';

interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
    warnings: Record<string, string>;
}

interface UseFormValidationOptions {
    stepId: string;
    data: any;
    realTime?: boolean;
    debounceMs?: number;
}

export function useFormValidation({
    stepId,
    data,
    realTime = true,
    debounceMs = 300
}: UseFormValidationOptions) {
    const [validation, setValidation] = useState<ValidationResult>({
        isValid: true,
        errors: {},
        warnings: {}
    });
    const [isValidating, setIsValidating] = useState(false);

    const validateForm = useCallback(async (formData: any) => {
        if (!realTime) return;

        setIsValidating(true);

        try {
            const result = validateStep(stepId, formData);

            if (result.success) {
                setValidation({
                    isValid: true,
                    errors: {},
                    warnings: generateWarnings(stepId, formData)
                });
            } else {
                const errors: Record<string, string> = {};

                if ('error' in result && result.error?.issues) {
                    result.error.issues.forEach((issue: any) => {
                        const field = issue.path.join('.');
                        errors[field] = issue.message;
                    });
                }

                setValidation({
                    isValid: false,
                    errors,
                    warnings: generateWarnings(stepId, formData)
                });
            }
        } catch (error) {
            console.error('Validation error:', error);
            setValidation({
                isValid: false,
                errors: { general: 'Validation failed. Please check your input.' },
                warnings: {}
            });
        } finally {
            setIsValidating(false);
        }
    }, [stepId, realTime]);

    // Debounced validation
    useEffect(() => {
        if (!realTime || !data) return;

        const timeoutId = setTimeout(() => {
            validateForm(data);
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [data, validateForm, debounceMs, realTime]);

    const validateField = useCallback((fieldName: string, value: any) => {
        try {
            // Get the schema for this step
            const stepSchema = getStepSchema(stepId);
            if (!stepSchema) return { isValid: true, error: null };

            // Extract field schema
            const fieldSchema = stepSchema.shape[fieldName];
            if (!fieldSchema) return { isValid: true, error: null };

            // Validate the field
            fieldSchema.parse(value);

            // Remove error for this field if validation passes
            setValidation(prev => ({
                ...prev,
                errors: {
                    ...prev.errors,
                    [fieldName]: undefined
                }
            }));

            return { isValid: true, error: null };
        } catch (error) {
            if (error instanceof z.ZodError) {
                const message = error.issues[0]?.message || 'Invalid value';

                // Set error for this field
                setValidation(prev => ({
                    ...prev,
                    isValid: false,
                    errors: {
                        ...prev.errors,
                        [fieldName]: message
                    }
                }));

                return { isValid: false, error: message };
            }
            return { isValid: false, error: 'Validation failed' };
        }
    }, [stepId]);

    const clearErrors = useCallback(() => {
        setValidation({
            isValid: true,
            errors: {},
            warnings: {}
        });
    }, []);

    const hasError = useCallback((fieldName: string) => {
        return !!validation.errors[fieldName];
    }, [validation.errors]);

    const getError = useCallback((fieldName: string) => {
        return validation.errors[fieldName];
    }, [validation.errors]);

    const hasWarning = useCallback((fieldName: string) => {
        return !!validation.warnings[fieldName];
    }, [validation.warnings]);

    const getWarning = useCallback((fieldName: string) => {
        return validation.warnings[fieldName];
    }, [validation.warnings]);

    return {
        validation,
        isValidating,
        validateForm,
        validateField,
        clearErrors,
        hasError,
        getError,
        hasWarning,
        getWarning
    };
}

// Helper function to get step schema
function getStepSchema(stepId: string): z.ZodObject<any> | null {
    const schemas: Record<string, z.ZodObject<any>> = {
        'configuration-details': z.object({
            title: z.string().min(1, 'Configuration title is required'),
            description: z.string().optional()
        }),
        'industry-focus': z.object({
            industryFocus: z.string().min(1, 'Please select an industry focus'),
            otherIndustry: z.string().optional()
        }),
        'core-platform-selection': z.object({
            corePlatforms: z.array(z.string()).min(1, 'Please select at least one platform')
        }),
        'operating-system-choice': z.object({
            operatingSystem: z.string().min(1, 'Please select an operating system')
        }),
        'key-application-features': z.object({
            keyFeatures: z.array(z.string()).min(1, 'Please select at least one feature')
        }),
        'hardware-peripheral-requirements': z.object({
            hardwareRequirements: z.array(z.string()).min(1, 'Please select at least one requirement')
        }),
        'middleware-frameworks': z.object({
            middlewareFrameworks: z.array(z.string()).min(1, 'Please select at least one framework')
        }),
        'driver-development-needs': z.object({
            driverNeeds: z.array(z.string()).min(1, 'Please select at least one driver need')
        }),
        'cloud-connectivity-strategy': z.object({
            cloudStrategy: z.string().min(1, 'Please select a cloud strategy'),
            cloudPlatforms: z.array(z.string()).optional(),
            dataProcessing: z.array(z.string()).optional()
        }),
        'contact-information': z.object({
            contactInfo: z.object({
                fullName: z.string().min(2, 'Full name must be at least 2 characters'),
                email: z.string().email('Please enter a valid email address'),
                companyName: z.string().min(1, 'Company name is required'),
                phoneNumber: z.string().optional(),
                projectDescription: z.string().optional()
            })
        })
    };

    return schemas[stepId] || null;
}

// Generate helpful warnings for better UX
function generateWarnings(stepId: string, data: any): Record<string, string> {
    const warnings: Record<string, string> = {};

    switch (stepId) {
        case 'core-platform-selection':
            if (data.corePlatforms?.length > 3) {
                warnings.corePlatforms = 'Selecting many platforms may increase complexity and cost.';
            }
            break;

        case 'key-application-features':
            if (data.keyFeatures?.length > 5) {
                warnings.keyFeatures = 'Many features selected. Consider prioritizing core functionality.';
            }
            break;

        case 'contact-information':
            if (data.contactInfo?.email && !data.contactInfo?.phoneNumber) {
                warnings.phoneNumber = 'Adding a phone number helps us reach you faster for urgent matters.';
            }
            if (data.contactInfo && !data.contactInfo?.projectDescription) {
                warnings.projectDescription = 'Project description helps us provide better recommendations.';
            }
            break;
    }

    return warnings;
}
