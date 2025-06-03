import { z } from 'zod';

// Contact Information Schema
export const contactInfoSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    phoneNumber: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
    projectDescription: z.string().min(10, 'Please provide at least 10 characters describing your project')
});

// Industry Focus Schema
export const industryFocusSchema = z.object({
    industryFocus: z.string().min(1, 'Please select an industry'),
    otherIndustry: z.string().optional()
}).refine((data) => {
    if (data.industryFocus === 'Other') {
        return data.otherIndustry && data.otherIndustry.length >= 3;
    }
    return true;
}, {
    message: 'Please specify your industry when selecting "Other"',
    path: ['otherIndustry']
});

// Platform Selection Schema
export const platformSelectionSchema = z.object({
    corePlatforms: z.array(z.string()).min(1, 'Please select at least one platform')
});

// Operating System Schema
export const operatingSystemSchema = z.object({
    operatingSystem: z.string().min(1, 'Please select an operating system')
});

// Key Features Schema
export const keyFeaturesSchema = z.object({
    keyFeatures: z.array(z.string()).min(1, 'Please select at least one key feature')
});

// Hardware Requirements Schema
export const hardwareRequirementsSchema = z.object({
    hardwareRequirements: z.array(z.string()).min(1, 'Please select at least one hardware requirement')
});

// Middleware Frameworks Schema
export const middlewareFrameworksSchema = z.object({
    middlewareFrameworks: z.array(z.string()).min(1, 'Please select at least one middleware framework')
});

// Driver Development Schema
export const driverDevelopmentSchema = z.object({
    driverNeeds: z.array(z.string()).min(1, 'Please select at least one driver development need')
});

// Cloud Connectivity Schema
export const cloudConnectivitySchema = z.object({
    cloudPlatforms: z.array(z.string()).min(1, 'Please select at least one cloud platform'),
    iotIntegration: z.string().min(1, 'Please select an IoT integration approach'),
    dataProcessing: z.array(z.string()).min(1, 'Please select at least one data processing requirement')
});

// Configuration Details Schema
export const configurationDetailsSchema = z.object({
    title: z.string().min(1, 'Configuration title is required').min(3, 'Title must be at least 3 characters'),
    description: z.string().optional()
});

// Complete Configuration Schema
export const completeConfigurationSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    industryFocus: z.string().min(1),
    otherIndustry: z.string().optional(),
    corePlatforms: z.array(z.string()).min(1),
    operatingSystem: z.string().min(1),
    keyFeatures: z.array(z.string()).min(1),
    hardwareRequirements: z.array(z.string()).min(1),
    middlewareFrameworks: z.array(z.string()).min(1),
    driverNeeds: z.array(z.string()).min(1),
    cloudPlatforms: z.array(z.string()).min(1),
    iotIntegration: z.string().min(1),
    dataProcessing: z.array(z.string()).min(1),
    cloudStrategy: z.string().optional(),
    contactInfo: contactInfoSchema
});

// Export types
export type ConfigurationDetails = z.infer<typeof configurationDetailsSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type IndustryFocus = z.infer<typeof industryFocusSchema>;
export type PlatformSelection = z.infer<typeof platformSelectionSchema>;
export type OperatingSystem = z.infer<typeof operatingSystemSchema>;
export type KeyFeatures = z.infer<typeof keyFeaturesSchema>;
export type HardwareRequirements = z.infer<typeof hardwareRequirementsSchema>;
export type MiddlewareFrameworks = z.infer<typeof middlewareFrameworksSchema>;
export type DriverDevelopment = z.infer<typeof driverDevelopmentSchema>;
export type CloudConnectivity = z.infer<typeof cloudConnectivitySchema>;
export type CompleteConfiguration = z.infer<typeof completeConfigurationSchema>;

// Validation helper functions
export const validateStep = (stepId: string, data: any) => {
    switch (stepId) {
        case 'configuration-details':
            return configurationDetailsSchema.safeParse(data);
        case 'industry-focus':
            return industryFocusSchema.safeParse(data);
        case 'core-platform-selection':
            return platformSelectionSchema.safeParse(data);
        case 'operating-system-choice':
            return operatingSystemSchema.safeParse(data);
        case 'key-application-features':
            return keyFeaturesSchema.safeParse(data);
        case 'hardware-peripheral-requirements':
            return hardwareRequirementsSchema.safeParse(data);
        case 'middleware-frameworks':
            return middlewareFrameworksSchema.safeParse(data);
        case 'driver-development-needs':
            return driverDevelopmentSchema.safeParse(data);
        case 'cloud-connectivity-strategy':
            return cloudConnectivitySchema.safeParse(data);
        case 'contact-information':
            return contactInfoSchema.safeParse(data);
        default:
            return { success: true, data };
    }
};
