"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Monitor, Globe, Smartphone, AlertTriangle, BarChart3 } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";
// @ts-ignore
import { toast } from 'sonner';

const KeyApplicationFeaturesPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(formData.keyFeatures || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const features = [
    {
      value: 'Over-The-Air (OTA) Updates',
      title: 'Over-The-Air (OTA) Updates',
      icon: Globe,
      description: 'Remote firmware and software updates without physical access. Enables continuous improvement, bug fixes, and feature additions throughout product lifecycle. Requires secure update mechanisms and rollback capabilities.'
    },
    {
      value: 'Real-time Performance Monitoring & Diagnostics',
      title: 'Real-time Performance Monitoring & Diagnostics',
      icon: Monitor,
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
      icon: BarChart3,
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

  useEffect(() => {
    // Simulate loading for skeleton
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

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
    if (selectedFeatures.length === 0) {
      setError('Please select at least one key application feature.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    // Update form data
    updateFormData('keyFeatures', selectedFeatures);

    // Mark step as completed
    markStepCompleted('key-application-features');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    toast.success('Key features saved!');
    router.push('/hardware-peripheral-requirements');
  };

  return (
    <PageLayout
      title="Select Key Application Features"
      description="Choose the key features your embedded system will need. This helps us recommend appropriate middleware, frameworks, and hardware components."
      stepId="key-application-features"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2 text-sm mb-2">
            {error}
          </div>
        )}
        <div className="grid gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-24" />
            ))
            : features.map((feature) => (
              <Card
                key={feature.value}
                role="button"
                tabIndex={0}
                aria-pressed={selectedFeatures.includes(feature.value)}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${selectedFeatures.includes(feature.value)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => handleFeatureToggle(feature.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFeatureToggle(feature.value);
                  }
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={feature.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                      checked={selectedFeatures.includes(feature.value)}
                      onCheckedChange={(checked) => {
                        // Only handle if the checkbox itself was clicked
                        // The card onClick will handle clicks outside the checkbox
                        handleFeatureToggle(feature.value);
                      }}
                      onClick={(e) => {
                        // Prevent the card's onClick from firing when clicking the checkbox
                        e.stopPropagation();
                      }}
                      className="mt-1"
                    />
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Label
                        htmlFor={feature.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        className="font-semibold text-lg cursor-pointer text-gray-900"
                      >
                        {feature.title}
                      </Label>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
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
