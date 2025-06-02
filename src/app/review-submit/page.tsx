"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  Edit,
  Send,
  Download,
  Clock,
  AlertCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const ReviewSubmitPage = () => {
  const { formData, markStepCompleted } = useConfigurator();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectionMappings = {
    'Industry Focus': {
      data: formData.industryFocus,
      otherData: formData.otherIndustry,
      editLink: '/industry-focus',
      icon: '🏭'
    },
    'Core Platform Selection': {
      data: formData.corePlatforms,
      otherData: undefined,
      editLink: '/core-platform-selection',
      icon: '🔧'
    },
    'Operating System Choice': {
      data: formData.operatingSystem,
      otherData: undefined,
      editLink: '/operating-system-choice',
      icon: '💻'
    },
    'Key Application Features': {
      data: formData.keyFeatures,
      otherData: undefined,
      editLink: '/key-application-features',
      icon: '⚡'
    },
    'Hardware & Peripheral Requirements': {
      data: formData.hardwareRequirements,
      otherData: undefined,
      editLink: '/hardware-peripheral-requirements',
      icon: '🔌'
    },
    'Middleware & Frameworks': {
      data: formData.middlewareFrameworks,
      otherData: undefined,
      editLink: '/middleware-frameworks',
      icon: '📚'
    },
    'Driver Development Needs': {
      data: formData.driverNeeds,
      otherData: undefined,
      editLink: '/driver-development-needs',
      icon: '🛠️'
    },
    'Cloud & Connectivity Strategy': {
      data: formData.cloudStrategy,
      otherData: undefined,
      editLink: '/cloud-connectivity-strategy',
      icon: '☁️'
    },
    'Contact Information': {
      data: formData.contactInfo,
      otherData: undefined,
      editLink: '/contact-information',
      icon: '📧'
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Submit configuration to backend API
      const response = await fetch('/api/configurations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit configuration');
      }

      const result = await response.json();

      if (result.success) {
        markStepCompleted('review-submit');

        // Send email notifications
        try {
          const notificationData = {
            id: result.configurationId,
            contactInfo: formData.contactInfo || {},
            submittedAt: new Date().toISOString(),
            industry: formData.industryFocus || 'Not specified',
            platforms: formData.corePlatforms || [],
            features: formData.keyFeatures || []
          };

          await fetch('/api/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData)
          });
        } catch (emailError) {
          console.error('Email notification error:', emailError);
          // Don't fail the submission if emails fail
        }

        setIsSubmitted(true);

        // Store configuration ID for future reference
        localStorage.setItem('lastConfigurationId', result.configurationId);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit configuration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    try {
      const { generateConfigurationPDF } = require('@/lib/pdf-generator');
      generateConfigurationPDF(formData);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const hasData = Object.values(sectionMappings).some(section => section.data);
  const completedSections = Object.entries(sectionMappings).filter(([, section]) => section.data);

  if (isSubmitted) {
    return (
      <PageLayout
        title="Submission Successful!"
        description="Thank you for your configuration request. Our team will review your requirements and contact you soon."
        stepId="review-submit"
      >
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Your configuration has been successfully submitted! Our engineering team will review your requirements and contact you within 1-2 business days with personalized recommendations.
            </AlertDescription>
          </Alert>            <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              We&apos;ve sent a confirmation email to your registered address with a copy of your configuration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={generatePDF} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF Summary
              </Button>
              <Link href="/">
                <Button variant="outline">
                  Start New Configuration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Review & Submit Configuration"
      description="Review your selections and submit your embedded system configuration request."
      stepId="review-submit"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Configuration Summary */}
        <div className="grid gap-6">
          {!hasData ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No configuration data found. Please go back and complete the configuration steps.
              </AlertDescription>
            </Alert>
          ) : (
            completedSections.map(([sectionName, section]) => (
              <Card key={sectionName} className="hover:shadow-sm transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span>{section.icon}</span>
                      {sectionName}
                    </CardTitle>
                    <Link href={section.editLink}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {section.data && (
                      <div>
                        {Array.isArray(section.data) ? (
                          <div className="flex flex-wrap gap-2">
                            {section.data.map((item, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : typeof section.data === 'object' ? (
                          <div className="space-y-1">
                            {Object.entries(section.data).map(([key, value]) => (
                              <div key={key} className="flex">
                                <span className="font-medium text-gray-600 w-32 text-xs">{key}:</span>
                                <span className="text-gray-900 text-xs">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-900 text-xs">{String(section.data)}</span>
                        )}
                      </div>
                    )}
                    {section.otherData && (
                      <div className="mt-2">
                        <span className="font-medium text-gray-600 text-xs">Additional Details: </span>
                        <span className="text-gray-900 text-xs">{section.otherData}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Action Buttons */}
        {hasData && (
          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t">
            <Link href="/contact-information">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contact Info
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={generatePDF}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Summary
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Configuration
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Additional Information */}          <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription className="text-xs">
            <strong>What happens next?</strong> Our engineering team will review your configuration and contact you within 1-2 business days with personalized recommendations, pricing information, and next steps for your embedded system project.
          </AlertDescription>
        </Alert>
      </div>
    </PageLayout>
  );
};

export default ReviewSubmitPage;
