"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cloud, Server, Database, Cpu, Shield, HelpCircle, Brain, BarChart3 } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const CloudConnectivityStrategyPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(formData.cloudPlatforms || []);
  const [iotIntegration, setIotIntegration] = useState<string>(formData.iotIntegration || 'undecided-iot');
  const [selectedDataProcessing, setSelectedDataProcessing] = useState<string[]>(formData.dataProcessing || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with form data when it changes
  useEffect(() => {
    if (formData.cloudPlatforms && JSON.stringify(formData.cloudPlatforms) !== JSON.stringify(selectedPlatforms)) {
      setSelectedPlatforms(formData.cloudPlatforms);
    }
    if (formData.iotIntegration && formData.iotIntegration !== iotIntegration) {
      setIotIntegration(formData.iotIntegration);
    }
    if (formData.dataProcessing && JSON.stringify(formData.dataProcessing) !== JSON.stringify(selectedDataProcessing)) {
      setSelectedDataProcessing(formData.dataProcessing);
    }
  }, [formData.cloudPlatforms, formData.iotIntegration, formData.dataProcessing, selectedPlatforms, iotIntegration, selectedDataProcessing]);

  const cloudPlatforms = [
    {
      id: "aws",
      label: "AWS",
      description: "Amazon Web Services - comprehensive cloud platform with IoT Core, extensive edge services, and global infrastructure. Strong enterprise features, machine learning services, and robust security. Best for: scalable enterprise solutions, complex data processing, global deployments.",
      icon: Cloud
    },
    {
      id: "azure",
      label: "Azure",
      description: "Microsoft Azure - enterprise-focused cloud with IoT Central, strong hybrid capabilities, and seamless Office 365 integration. Excellent for organizations using Microsoft ecosystem. Best for: enterprise environments, hybrid cloud, Microsoft technology stacks.",
      icon: Server
    },
    {
      id: "gcp",
      label: "Google Cloud Platform",
      description: "Google Cloud Platform - analytics and AI-focused cloud with IoT Core and powerful data processing capabilities. Strong in machine learning and real-time analytics. Best for: data analytics, AI/ML workloads, real-time processing.",
      icon: Database
    },
    {
      id: "private-cloud",
      label: "Private Cloud",
      description: "Dedicated cloud infrastructure for enhanced security and control. Provides cloud benefits while maintaining data sovereignty and compliance requirements. Best for: sensitive data, regulatory compliance, customized environments.",
      icon: Shield
    },
    {
      id: "on-premise-only",
      label: "On-Premise Only",
      description: "Local infrastructure without cloud connectivity. Maximum data control and security but limited scalability and remote access. Best for: air-gapped environments, sensitive applications, minimal connectivity requirements.",
      icon: Server
    },
    {
      id: "undecided-cloud",
      label: "Undecided",
      description: "Need help choosing the right cloud strategy? Our team will evaluate your requirements including data sensitivity, compliance needs, scalability requirements, and budget to recommend the optimal approach.",
      icon: HelpCircle
    }
  ];

  const iotIntegrationOptions = [
    {
      value: "yes-iot",
      title: "Yes - IoT Platform Integration",
      description: "Integrate with managed IoT platforms for device management, fleet management, over-the-air updates, and centralized monitoring. Provides enterprise-grade device lifecycle management and operational insights.",
      icon: Cpu
    },
    {
      value: "no-iot",
      title: "No IoT Platform Integration",
      description: "Direct cloud connectivity without managed IoT platform services. Uses basic cloud services for data storage and processing. Suitable for simple deployments or custom integration requirements.",
      icon: Server
    },
    {
      value: "undecided-iot",
      title: "Undecided on IoT Platform",
      description: "Not sure if IoT platform integration is needed? We'll help evaluate your device management needs, scalability requirements, and operational complexity to recommend the best approach.",
      icon: HelpCircle
    }
  ];

  const dataProcessingNeeds = [
    {
      id: "edge-ai",
      label: "Edge AI Processing",
      description: "On-device artificial intelligence and machine learning for real-time inference, reduced latency, and privacy preservation. Requires powerful edge hardware and optimized AI frameworks.",
      icon: Brain
    },
    {
      id: "cloud-ai-ml",
      label: "Cloud-based AI/ML",
      description: "Server-side machine learning processing with access to powerful compute resources and large datasets. Enables complex models and continuous learning but requires reliable connectivity.",
      icon: Cloud
    },
    {
      id: "real-time-streaming",
      label: "Real-time Data Streaming",
      description: "Continuous data transmission for live monitoring, real-time analytics, and immediate response capabilities. Essential for time-critical applications and live dashboards.",
      icon: BarChart3
    }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(item => item !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  const handleDataProcessingToggle = (processingId: string) => {
    setSelectedDataProcessing(prev => {
      if (prev.includes(processingId)) {
        return prev.filter(item => item !== processingId);
      } else {
        return [...prev, processingId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save current data
    updateFormData('cloudPlatforms', selectedPlatforms);
    updateFormData('iotIntegration', iotIntegration);
    updateFormData('dataProcessing', selectedDataProcessing);
    markStepCompleted('cloud-connectivity-strategy');

    // Navigate to next step
    router.push('/contact-information');
  };

  return (
    <PageLayout
      title="Cloud & Connectivity Strategy"
      description="Define your cloud infrastructure preferences and connectivity requirements to ensure optimal performance and scalability for your embedded system."
      stepId="cloud-connectivity-strategy"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Cloud Platform Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Cloud Platform Preferences</h2>
          <p className="text-xs text-gray-600">Select one or more cloud platforms you&apos;d like to consider (you can choose multiple)</p>
          <div className="space-y-4">
            {cloudPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.id);

              return (
                <Card
                  key={platform.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  className={`cursor-pointer transition-all duration-200 ${isSelected
                    ? 'ring-2 ring-primary bg-primary/5 border-primary'
                    : 'hover:bg-accent/50 hover:border-accent'
                    }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePlatformToggle(platform.id);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={platform.id}
                        checked={isSelected}
                        onCheckedChange={() => handlePlatformToggle(platform.id)}
                        className="mt-1"
                      />
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <Label
                            htmlFor={platform.id}
                            className="font-semibold text-sm cursor-pointer"
                          >
                            {platform.label}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            {platform.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* IoT Platform Integration */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">IoT Platform Integration</h2>
          <p className="text-xs text-gray-600">Choose your preferred approach for IoT device management and integration</p>
          <RadioGroup value={iotIntegration} onValueChange={(value) => {
            console.log('RadioGroup onValueChange:', value);
            if (value && typeof value === 'string') {
              setIotIntegration(value);
            }
          }} className="space-y-4">
            {iotIntegrationOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = iotIntegration === option.value;

              return (
                <Card
                  key={option.value}
                  className={`cursor-pointer transition-all duration-200 ${isSelected
                    ? 'ring-2 ring-primary bg-primary/5 border-primary'
                    : 'hover:bg-accent/50 hover:border-accent'
                    }`}
                  onClick={() => setIotIntegration(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <Label
                            htmlFor={option.value}
                            className="font-semibold text-sm cursor-pointer"
                          >
                            {option.title}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </RadioGroup>
        </div>

        {/* Data Processing Needs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Data Processing Requirements</h2>
          <p className="text-xs text-gray-600">Select the data processing capabilities you need (you can choose multiple)</p>
          <div className="space-y-4">
            {dataProcessingNeeds.map((need) => {
              const IconComponent = need.icon;
              const isSelected = selectedDataProcessing.includes(need.id);

              return (
                <Card
                  key={need.id}
                  className={`cursor-pointer transition-all duration-200 ${isSelected
                    ? 'ring-2 ring-primary bg-primary/5 border-primary'
                    : 'hover:bg-accent/50 hover:border-accent'
                    }`}
                  onClick={() => handleDataProcessingToggle(need.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={need.id}
                        checked={isSelected}
                        onCheckedChange={() => handleDataProcessingToggle(need.id)}
                        className="mt-1"
                      />
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <Label
                            htmlFor={need.id}
                            className="font-semibold text-sm cursor-pointer"
                          >
                            {need.label}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            {need.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Continue to Contact Information'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </PageLayout>
  );
};

export default CloudConnectivityStrategyPage;
