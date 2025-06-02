"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Mail, Building, Phone, FileText } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const ContactInformationPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [contactInfo, setContactInfo] = useState({
    fullName: formData.contactInfo?.fullName || '',
    email: formData.contactInfo?.email || '',
    companyName: formData.contactInfo?.companyName || '',
    phoneNumber: formData.contactInfo?.phoneNumber || '',
    projectDescription: formData.contactInfo?.projectDescription || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!contactInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!contactInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!contactInfo.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Save current data
    updateFormData('contactInfo', contactInfo);
    markStepCompleted('contact-information');

    // Navigate to review page
    router.push('/review-submit');
  };
  return (
    <PageLayout
      title="Contact Information"
      description="Provide your contact details so our engineering team can reach out with personalized recommendations and discuss your project requirements. All information is confidential and will only be used to assist with your embedded system configuration."
      stepId="contact-information"
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Full Name *</span>
              </Label>
              <Input
                type="text"
                id="fullName"
                value={contactInfo.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Company Email *</span>
              </Label>
              <Input
                type="email"
                id="email"
                value={contactInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your company email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Company Name *</span>
              </Label>
              <Input
                type="text"
                id="companyName"
                value={contactInfo.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter your company name"
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number (Optional)</span>
              </Label>
              <Input
                type="tel"
                id="phoneNumber"
                value={contactInfo.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Brief Project Description (Optional)</span>
              </Label>
              <Textarea
                id="projectDescription"
                value={contactInfo.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                placeholder="Enter a brief description of your project goals, timeline, or any specific requirements"
                className="h-24 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This helps our team better understand your project and provide more targeted recommendations.
              </p>
            </div>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 mb-1">What happens next?</h4>
                  <p className="text-sm text-blue-700">
                    Our embedded systems engineers will review your configuration and reach out within 1-2 business days with:
                  </p>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Detailed hardware and software recommendations</li>
                    <li>• Project timeline and development approach</li>
                    <li>• Technical architecture suggestions</li>
                    <li>• Next steps for your embedded system project</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Review & Submit Configuration'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default ContactInformationPage;
