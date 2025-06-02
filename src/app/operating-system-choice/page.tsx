"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Monitor, Zap, Layers, HelpCircle } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const OperatingSystemChoicePage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedOS, setSelectedOS] = useState(formData.operatingSystem || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const operatingSystems = [
    {
      value: 'Linux (e.g., Yocto Project, Debian-based)',
      title: 'Linux (Yocto Project, Debian-based)',
      icon: Monitor,
      description: 'Full-featured OS with rich ecosystem, extensive hardware support, and networking capabilities. Yocto provides custom embedded Linux builds, while Debian offers ready-to-use distributions. Best for: complex applications, networking, web services, and development flexibility.'
    },
    {
      value: 'Real-Time Operating System (RTOS) (e.g., QNX, FreeRTOS, Zephyr)',
      title: 'Real-Time Operating System (RTOS)',
      icon: Zap,
      description: 'Deterministic operating systems guaranteeing response times for time-critical applications. QNX offers commercial-grade reliability, FreeRTOS provides open-source simplicity, Zephyr enables IoT optimization. Best for: control systems, safety-critical applications, real-time processing.'
    },
    {
      value: 'Bare-metal',
      title: 'Bare-metal',
      icon: Layers,
      description: 'Direct hardware programming without an operating system layer. Provides maximum performance, minimal latency, and complete control over system resources. Requires extensive low-level programming expertise. Best for: ultra-low latency, minimal power consumption, simple dedicated functions.'
    },
    {
      value: 'Android (AOSP)',
      title: 'Android (AOSP)',
      icon: Monitor,
      description: 'Android Open Source Project providing familiar mobile-like user interface and app ecosystem. Includes touch interface support, multimedia capabilities, and Java/Kotlin development environment. Best for: consumer devices, touchscreen interfaces, multimedia applications.'
    },
    {
      value: 'Unsure / Needs Consultation',
      title: 'Unsure / Needs Consultation',
      icon: HelpCircle,
      description: 'Not sure which operating system fits your requirements? Our team will evaluate your performance needs, real-time constraints, development resources, and application complexity to recommend the optimal OS choice.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOS) return;

    setIsSubmitting(true);

    // Update form data
    updateFormData('operatingSystem', selectedOS);

    // Mark step as completed
    markStepCompleted('operating-system-choice');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push('/key-application-features');
  };

  const isFormValid = selectedOS !== '';

  return (
    <PageLayout
      title="Select Operating System"
      description="Choose the operating system that best matches your application requirements and development approach."
      stepId="operating-system-choice"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <RadioGroup value={selectedOS} onValueChange={setSelectedOS}>
          <div className="grid gap-4">
            {operatingSystems.map((os) => {
              const IconComponent = os.icon;
              const isSelected = selectedOS === os.value;

              return (
                <Card
                  key={os.value}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => setSelectedOS(os.value)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <RadioGroupItem
                        value={os.value}
                        id={os.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <IconComponent className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                          </div>
                          <Label
                            htmlFor={os.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                            className="font-semibold text-lg cursor-pointer"
                          >
                            {os.title}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {os.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </RadioGroup>

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
                Continue to Key Features
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default OperatingSystemChoicePage;
