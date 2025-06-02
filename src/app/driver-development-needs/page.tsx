"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Settings, Wrench } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const DriverDevelopmentNeedsPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(formData.driverNeeds || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const driverNeeds = [
    {
      value: 'Custom Peripheral Drivers',
      title: 'Custom Peripheral Drivers',
      description: 'Development of new device drivers for proprietary or uncommon hardware components. Includes register-level programming, interrupt handling, and hardware abstraction layers. Required for unique sensors, custom ASICs, or specialized peripherals not supported by existing drivers.',
      icon: Code
    },
    {
      value: 'Existing Driver Integration & Modification',
      title: 'Existing Driver Integration & Modification',
      description: 'Adapting and integrating existing open-source or vendor-provided drivers into your system. May involve porting between operating systems, optimization for specific use cases, or bug fixes. Less complex than custom development but requires driver architecture knowledge.',
      icon: Settings
    },
    {
      value: 'BSP (Board Support Package) Customization',
      title: 'BSP (Board Support Package) Customization',
      description: 'Low-level platform initialization code including bootloader modifications, device tree configuration, pin multiplexing, and hardware bring-up. Essential for custom board designs and ensures proper hardware initialization and resource allocation.',
      icon: Wrench
    }
  ];

  const handleNeedToggle = (needValue: string) => {
    setSelectedNeeds(prev => {
      if (prev.includes(needValue)) {
        return prev.filter(item => item !== needValue);
      } else {
        return [...prev, needValue];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save current data
    updateFormData('driverNeeds', selectedNeeds);
    markStepCompleted('driver-development-needs');

    // Navigate to next step
    router.push('/cloud-connectivity-strategy');
  };

  return (
    <PageLayout
      title="Driver Development Needs"
      description="Select the type of driver development support you'll need for your embedded system. This helps us understand the complexity of low-level software development required."
      stepId="driver-development-needs"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {driverNeeds.map((need) => {
            const IconComponent = need.icon;
            const isSelected = selectedNeeds.includes(need.value);

            return (
              <Card
                key={need.value}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <CardContent className="p-6 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start space-x-4 mb-4">
                      <Checkbox
                        id={need.value.toLowerCase().replace(/\s+/g, '-')}
                        checked={isSelected}
                        onCheckedChange={() => handleNeedToggle(need.value)}
                        className="mt-1 flex-shrink-0"
                      />
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={need.value.toLowerCase().replace(/\s+/g, '-')}
                          className="font-semibold text-lg cursor-pointer text-gray-900 block leading-tight"
                        >
                          {need.title}
                        </Label>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {need.description}
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
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Cloud Strategy
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default DriverDevelopmentNeedsPage;
