"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, Microchip, Zap, Eye, Loader2 } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";
import {
  AnimatedButton,
  AnimatedCard,
  FadeIn,
  SlideUp,
  StaggeredList
} from "@/components/animated";

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
      title="Step 3: Select Core Platform"
      description="Choose the hardware platform(s) that best fit your embedded system requirements. You can select multiple options."
      stepId="core-platform-selection"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <SlideUp delay={0.1}>
          <StaggeredList className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {platforms.map((platform, index) => {
              const IconComponent = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.value);

              return (
                <AnimatedCard key={platform.value} delay={0.1 + index * 0.1}>
                  <Card
                    className={`transition-all duration-200 hover:shadow-lg border-2 cursor-pointer ${isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <CardContent className="p-6 h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start space-x-4 mb-4">
                          <Checkbox
                            id={platform.value.toLowerCase().replace(/\s+/g, '-')}
                            checked={isSelected}
                            onCheckedChange={() => handlePlatformToggle(platform.value)}
                            className="mt-1 flex-shrink-0"
                          />
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Label
                              htmlFor={platform.value.toLowerCase().replace(/\s+/g, '-')}
                              className="font-semibold text-lg cursor-pointer text-gray-900 block leading-tight"
                            >
                              {platform.title}
                            </Label>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {platform.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              );
            })}
          </StaggeredList>
        </SlideUp>

        <FadeIn delay={0.4}>
          <div className="flex justify-center pt-6">
            <AnimatedButton>
              <Button
                type="submit"
                size="lg"
                disabled={!isFormValid || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin rounded-full h-4 w-4 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Step 4: Operating System
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </AnimatedButton>
          </div>
        </FadeIn>
      </form>
    </PageLayout>
  );
};

export default CorePlatformSelectionPage;
