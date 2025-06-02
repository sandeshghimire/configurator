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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {driverNeeds.map((need) => {
            const IconComponent = need.icon;
            const isSelected = selectedNeeds.includes(need.value);

            return (
              <Card
                key={need.value}
                className={`cursor-pointer transition-all duration-200 ${isSelected
                  ? 'ring-2 ring-primary bg-primary/5 border-primary'
                  : 'hover:bg-accent/50 hover:border-accent'
                  }`}
                onClick={() => handleNeedToggle(need.value)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={need.value.toLowerCase().replace(/\s+/g, '-')}
                      checked={isSelected}
                      onCheckedChange={() => handleNeedToggle(need.value)}
                      className="mt-1"
                    />
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor={need.value.toLowerCase().replace(/\s+/g, '-')}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {need.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
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

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Continue to Cloud Strategy'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </PageLayout>
  );
};

export default DriverDevelopmentNeedsPage;
