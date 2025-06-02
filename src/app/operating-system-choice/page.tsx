"use client";

import React, { useState, useEffect } from 'react';
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

  // Sync with form data when it changes
  useEffect(() => {
    if (formData.operatingSystem && formData.operatingSystem !== selectedOS) {
      setSelectedOS(formData.operatingSystem);
    }
  }, [formData.operatingSystem, selectedOS]);

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
        <RadioGroup value={selectedOS} onValueChange={(value) => {
          console.log('RadioGroup onValueChange:', value);
          if (value && typeof value === 'string') {
            setSelectedOS(value);
          }
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {operatingSystems.map((os) => {
              const IconComponent = os.icon;
              const isSelected = selectedOS === os.value;

              return (
                <Card
                  key={os.value}
                  className={`transition-all duration-200 hover:shadow-lg border-2 cursor-pointer ${isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <CardContent className="p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start space-x-4 mb-4">
                        <RadioGroupItem
                          value={os.value}
                          id={os.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                          className="mt-1 flex-shrink-0"
                        />
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Label
                            htmlFor={os.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                            className="font-semibold text-lg cursor-pointer text-gray-900 block leading-tight"
                          >
                            {os.title}
                          </Label>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 leading-relaxed">
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

        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={!isFormValid || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Key Features
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default OperatingSystemChoicePage;
