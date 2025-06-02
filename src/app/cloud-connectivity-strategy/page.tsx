"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cloud, Server, Database, Cpu, Shield, HelpCircle, Brain, BarChart3, Loader2 } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const CloudConnectivityStrategyPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    ...(formData.cloudPlatforms || []),
    ...(formData.iotIntegration ? [formData.iotIntegration] : []),
    ...(formData.dataProcessing || [])
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // All cloud connectivity and strategy options in a unified array
  const allOptions = [
    // Cloud Platform Options
    {
      value: 'aws',
      title: 'AWS Cloud Platform',
      icon: Cloud,
      description: 'Amazon Web Services - comprehensive cloud platform with IoT Core, extensive edge services, and global infrastructure. Strong enterprise features, machine learning services, and robust security. Best for: scalable enterprise solutions, complex data processing, global deployments.'
    },
    {
      value: 'azure',
      title: 'Azure Cloud Platform',
      icon: Server,
      description: 'Microsoft Azure - enterprise-focused cloud with IoT Central, strong hybrid capabilities, and seamless Office 365 integration. Excellent for organizations using Microsoft ecosystem. Best for: enterprise environments, hybrid cloud, Microsoft technology stacks.'
    },
    {
      value: 'gcp',
      title: 'Google Cloud Platform',
      icon: Database,
      description: 'Google Cloud Platform - analytics and AI-focused cloud with IoT Core and powerful data processing capabilities. Strong in machine learning and real-time analytics. Best for: data analytics, AI/ML workloads, real-time processing.'
    },
    {
      value: 'private-cloud',
      title: 'Private Cloud Infrastructure',
      icon: Shield,
      description: 'Dedicated cloud infrastructure for enhanced security and control. Provides cloud benefits while maintaining data sovereignty and compliance requirements. Best for: sensitive data, regulatory compliance, customized environments.'
    },
    {
      value: 'on-premise-only',
      title: 'On-Premise Only',
      icon: Server,
      description: 'Local infrastructure without cloud connectivity. Maximum data control and security but limited scalability and remote access. Best for: air-gapped environments, sensitive applications, minimal connectivity requirements.'
    },
    {
      value: 'iot-platform-integration',
      title: 'IoT Platform Integration',
      icon: Cpu,
      description: 'Integrate with managed IoT platforms for device management, fleet management, over-the-air updates, and centralized monitoring. Provides enterprise-grade device lifecycle management and operational insights.'
    },
    {
      value: 'direct-cloud-connectivity',
      title: 'Direct Cloud Connectivity',
      icon: Server,
      description: 'Direct cloud connectivity without managed IoT platform services. Uses basic cloud services for data storage and processing. Suitable for simple deployments or custom integration requirements.'
    },
    {
      value: 'edge-ai-processing',
      title: 'Edge AI Processing',
      icon: Brain,
      description: 'On-device artificial intelligence and machine learning for real-time inference, reduced latency, and privacy preservation. Requires powerful edge hardware and optimized AI frameworks.'
    },
    {
      value: 'cloud-ai-ml',
      title: 'Cloud-based AI/ML',
      icon: Cloud,
      description: 'Server-side machine learning processing with access to powerful compute resources and large datasets. Enables complex models and continuous learning but requires reliable connectivity.'
    },
    {
      value: 'real-time-streaming',
      title: 'Real-time Data Streaming',
      icon: BarChart3,
      description: 'Continuous data transmission for live monitoring, real-time analytics, and immediate response capabilities. Essential for time-critical applications and live dashboards.'
    },
    {
      value: 'undecided-cloud-strategy',
      title: 'Undecided / Needs Consultation',
      icon: HelpCircle,
      description: 'Need help choosing the right cloud strategy? Our team will evaluate your requirements including data sensitivity, compliance needs, scalability requirements, and budget to recommend the optimal approach.'
    }
  ];

  const handleOptionToggle = (optionValue: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionValue)) {
        return prev.filter(option => option !== optionValue);
      } else {
        return [...prev, optionValue];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOptions.length === 0) return;

    setIsSubmitting(true);

    // Separate options by category
    const cloudPlatformOptions = ['aws', 'azure', 'gcp', 'private-cloud', 'on-premise-only'];
    const iotOptions = ['iot-platform-integration', 'direct-cloud-connectivity'];
    const dataProcessingOptions = ['edge-ai-processing', 'cloud-ai-ml', 'real-time-streaming'];

    const cloudPlatforms = selectedOptions.filter(opt => cloudPlatformOptions.includes(opt));
    const iotIntegration = selectedOptions.find(opt => iotOptions.includes(opt)) || '';
    const dataProcessing = selectedOptions.filter(opt => dataProcessingOptions.includes(opt));

    // Update form data
    updateFormData('cloudPlatforms', cloudPlatforms);
    updateFormData('iotIntegration', iotIntegration);
    updateFormData('dataProcessing', dataProcessing);

    // Mark step as completed
    markStepCompleted('cloud-connectivity-strategy');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push('/contact-information');
  };

  const isFormValid = selectedOptions.length > 0;

  return (
    <PageLayout
      title="Cloud & Connectivity Strategy"
      description="Define your cloud infrastructure preferences and connectivity requirements to ensure optimal performance and scalability for your embedded system. You can select multiple options."
      stepId="cloud-connectivity-strategy"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedOptions.includes(option.value);

            return (
              <Card
                key={option.value}
                className={`transition-all duration-200 hover:shadow-lg border-2 cursor-pointer ${isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <CardContent className="p-6 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start space-x-4 mb-4">
                      <Checkbox
                        id={option.value.toLowerCase().replace(/\s+/g, '-')}
                        checked={isSelected}
                        onCheckedChange={() => handleOptionToggle(option.value)}
                        className="mt-1 flex-shrink-0"
                      />
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={option.value.toLowerCase().replace(/\s+/g, '-')}
                          className="font-semibold text-lg cursor-pointer text-gray-900 block leading-tight"
                        >
                          {option.title}
                        </Label>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={!isFormValid || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Contact Information
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default CloudConnectivityStrategyPage;
