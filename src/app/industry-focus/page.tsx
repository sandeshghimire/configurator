"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Factory, Car, Heart, Plane, Smartphone, Loader2 } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";
import {
  AnimatedButton,
  AnimatedCard,
  FadeIn,
  SlideUp,
  StaggeredList
} from "@/components/animated";

const IndustryFocusPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedIndustry, setSelectedIndustry] = useState(formData.industryFocus || '');
  const [otherIndustry, setOtherIndustry] = useState(formData.otherIndustry || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with form data when it changes
  useEffect(() => {
    if (formData.industryFocus && formData.industryFocus !== selectedIndustry) {
      setSelectedIndustry(formData.industryFocus);
    }
    if (formData.otherIndustry && formData.otherIndustry !== otherIndustry) {
      setOtherIndustry(formData.otherIndustry);
    }
  }, [formData.industryFocus, formData.otherIndustry, selectedIndustry, otherIndustry]);

  const industries = [
    {
      value: 'Automotive',
      title: 'Automotive',
      icon: Car,
      description: 'Advanced driver assistance systems (ADAS), in-vehicle infotainment, autonomous driving platforms, and vehicle connectivity solutions. Requires automotive-grade components, functional safety (ISO 26262), and real-time processing capabilities.'
    },
    {
      value: 'Aerospace & Defense',
      title: 'Aerospace & Defense',
      icon: Plane,
      description: 'Mission-critical systems, avionics, satellite communications, and defense applications. Demands high reliability, radiation hardening, military standards compliance (MIL-STD), and secure communications.'
    },
    {
      value: 'Healthcare & Medical Devices',
      title: 'Healthcare & Medical Devices',
      icon: Heart,
      description: 'Medical imaging, patient monitoring, diagnostic equipment, and connected health devices. Requires FDA compliance, patient safety standards (IEC 62304), data privacy (HIPAA), and ultra-low power consumption.'
    },
    {
      value: 'Industrial Automation',
      title: 'Industrial Automation',
      icon: Factory,
      description: 'Factory automation, robotics control, industrial IoT, and process monitoring systems. Needs industrial-grade components, real-time control, harsh environment tolerance, and industrial communication protocols.'
    },
    {
      value: 'Consumer Electronics',
      title: 'Consumer Electronics',
      icon: Smartphone,
      description: 'Smart home devices, wearables, entertainment systems, and IoT products. Focus on cost optimization, power efficiency, user experience, and wireless connectivity.'
    },
    {
      value: 'Other',
      title: 'Other Industries',
      icon: Factory,
      description: 'Smart agriculture, energy management, retail, transportation, or custom applications. We\'ll work with you to understand your specific requirements and recommend the best configuration.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIndustry) return;

    setIsSubmitting(true);

    // Update form data
    updateFormData('industryFocus', selectedIndustry);
    if (selectedIndustry === 'Other' && otherIndustry) {
      updateFormData('otherIndustry', otherIndustry);
    }

    // Mark step as completed
    markStepCompleted('industry-focus');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push('/core-platform-selection');
  };

  const isFormValid = selectedIndustry && (selectedIndustry !== 'Other' || otherIndustry.trim());

  return (
    <PageLayout
      title="Step 2: Select Your Industry"
      description="Choose the industry that best describes your embedded system project. This helps us provide more targeted recommendations."
      stepId="industry-focus"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <SlideUp delay={0.1}>
          <RadioGroup value={selectedIndustry} onValueChange={(value) => {
            console.log('RadioGroup onValueChange:', value);
            if (value && typeof value === 'string') {
              setSelectedIndustry(value);
            }
          }}>
            <StaggeredList className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <AnimatedCard key={industry.value} delay={0.1 + index * 0.1}>
                  <Card
                    className={`transition-all duration-200 hover:shadow-lg border-2 cursor-pointer ${selectedIndustry === industry.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <CardContent className="p-6 h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start space-x-4 mb-4">
                          <RadioGroupItem
                            value={industry.value}
                            id={industry.value.toLowerCase().replace(/\s+/g, '-')}
                            className="mt-1 flex-shrink-0"
                          />
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                            <industry.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Label
                              htmlFor={industry.value.toLowerCase().replace(/\s+/g, '-')}
                              className="font-semibold text-lg cursor-pointer text-gray-900 block leading-tight"
                            >
                              {industry.title}
                            </Label>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {industry.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </StaggeredList>
          </RadioGroup>
        </SlideUp>

        {selectedIndustry === 'Other' && (
          <FadeIn delay={0.3}>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Label htmlFor="otherIndustry" className="text-xs font-medium text-gray-900">
                    Please specify your industry:
                  </Label>
                  <Input
                    type="text"
                    id="otherIndustry"
                    value={otherIndustry}
                    onChange={(e) => setOtherIndustry(e.target.value)}
                    placeholder="e.g., Smart Agriculture, Energy Management, Transportation..."
                    className="border-orange-300 focus:border-orange-500"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        )}

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
                    Continue to Step 3: Platform Selection
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

export default IndustryFocusPage;
