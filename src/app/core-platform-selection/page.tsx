"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, Microchip, Zap, Eye } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const CorePlatformSelectionPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(formData.corePlatforms || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const platforms = [
    {
      value: 'Raspberry Pi Solutions',
      title: 'Raspberry Pi Solutions',
      icon: Cpu,
      description: 'Cost-effective ARM-based platforms ideal for prototyping, education, and general-purpose IoT applications. Features rich GPIO, multiple connectivity options, and extensive community support. Best for: rapid prototyping, low-cost deployment, educational projects.'
    },
    {
      value: 'AMD Xilinx Zynq Solutions',
      title: 'AMD Xilinx Zynq Solutions',
      icon: Microchip,
      description: 'Heterogeneous SoCs combining ARM processors with FPGA fabric for hardware acceleration. Excellent for signal processing, real-time control, and custom hardware interfaces. Best for: high-performance computing, custom acceleration, adaptive algorithms.'
    },
    {
      value: 'NXP i.MX Industrial Platforms',
      title: 'NXP i.MX Industrial Platforms',
      icon: Zap,
      description: 'Industrial-grade ARM processors designed for harsh environments and long-term availability. Features automotive-grade components, extended temperature ranges, and industrial certifications. Best for: industrial automation, automotive, long-lifecycle products.'
    },
    {
      value: 'NVIDIA Jetson Edge Computing',
      title: 'NVIDIA Jetson Edge Computing',
      icon: Eye,
      description: 'AI-focused platforms with powerful GPU acceleration for machine learning and computer vision. Includes CUDA support, TensorRT optimization, and comprehensive AI software stack. Best for: AI/ML inference, computer vision, autonomous systems.'
    },
    {
      value: 'Unsure / Needs Consultation',
      title: 'Unsure / Needs Consultation',
      icon: Cpu,
      description: 'Not sure which platform fits your needs? Our engineers will analyze your requirements and recommend the optimal platform based on performance, power, cost, and feature requirements specific to your application.'
    }
  ];

  const handlePlatformToggle = (platformValue: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformValue)) {
        return prev.filter(p => p !== platformValue);
      } else {
        return [...prev, platformValue];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatforms.length === 0) return;

    setIsSubmitting(true);

    // Update form data
    updateFormData('corePlatforms', selectedPlatforms);

    // Mark step as completed
    markStepCompleted('core-platform-selection');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push('/operating-system-choice');
  };

  const isFormValid = selectedPlatforms.length > 0;

  return (
    <PageLayout
      title="Select Core Platform"
      description="Choose the hardware platform(s) that best fit your embedded system requirements. You can select multiple options."
      stepId="core-platform-selection"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.value);

            return (
              <Card
                key={platform.value}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => handlePlatformToggle(platform.value)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id={platform.value.toLowerCase().replace(/\s+/g, '-')}
                      checked={isSelected}
                      onCheckedChange={() => handlePlatformToggle(platform.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <IconComponent className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                        <Label
                          htmlFor={platform.value.toLowerCase().replace(/\s+/g, '-')}
                          className="font-semibold text-lg cursor-pointer"
                        >
                          {platform.title}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {platform.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Operating System
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default CorePlatformSelectionPage;
