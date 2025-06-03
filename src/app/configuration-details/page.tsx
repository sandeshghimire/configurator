"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Edit, Loader2 } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const ConfigurationDetailsPage = () => {
    const router = useRouter();
    const { formData, updateFormData, markStepCompleted } = useConfigurator();
    const [configDetails, setConfigDetails] = useState({
        title: formData.title || '',
        description: formData.description || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load existing data when component mounts
    useEffect(() => {
        if (formData.title && formData.title !== configDetails.title) {
            setConfigDetails(prev => ({ ...prev, title: formData.title || '' }));
        }
        if (formData.description && formData.description !== configDetails.description) {
            setConfigDetails(prev => ({ ...prev, description: formData.description || '' }));
        }
    }, [formData.title, formData.description, configDetails.title, configDetails.description]);

    const handleInputChange = (field: keyof typeof configDetails, value: string) => {
        setConfigDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Update form data with configuration details
            updateFormData('title', configDetails.title);
            updateFormData('description', configDetails.description);

            // Mark this step as completed
            markStepCompleted('configuration-details');

            // Navigate to the next step
            router.push('/industry-focus');
        } catch (error) {
            console.error('Error saving configuration details:', error);
            alert('Failed to save configuration details. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = configDetails.title.trim().length > 0;

    return (
        <PageLayout
            title="Step 1: Configuration Details"
            description="Give your SOC configuration a title and description to help identify it later."
            stepId="configuration-details"
        >
            <div className="w-full max-w-2xl mx-auto">
                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="flex items-center space-x-2">
                                        <Edit className="h-4 w-4" />
                                        <span>Configuration Title *</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        value={configDetails.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Enter a descriptive title for your SOC configuration"
                                        className="w-full"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Choose a clear, descriptive title that will help you identify this configuration later.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="flex items-center space-x-2">
                                        <FileText className="h-4 w-4" />
                                        <span>Configuration Description (Optional)</span>
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={configDetails.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Provide additional details about your SOC configuration requirements, goals, or any specific constraints"
                                        className="h-32 resize-none"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Add any additional context that might help our team better understand your requirements.
                                    </p>
                                </div>
                            </div>

                            <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="p-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-blue-900 mb-2">Why provide these details?</h3>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• Helps organize and identify your configurations</li>
                                                <li>• Enables better tracking and management</li>
                                                <li>• Assists our team in providing targeted recommendations</li>
                                                <li>• Useful for future reference and comparisons</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-center pt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={!isFormValid || isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin rounded-full h-4 w-4 mr-2" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            Continue to Step 2: Industry Focus
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PageLayout>
    );
};

export default ConfigurationDetailsPage;
