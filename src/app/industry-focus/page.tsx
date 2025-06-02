import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IndustryFocusPage = () => {
  const industries = [
    {
      value: 'Automotive',
      title: 'Automotive',
      description: 'Advanced driver assistance systems (ADAS), in-vehicle infotainment, autonomous driving platforms, and vehicle connectivity solutions. Requires automotive-grade components, functional safety (ISO 26262), and real-time processing capabilities.'
    },
    {
      value: 'Aerospace & Defense',
      title: 'Aerospace & Defense',
      description: 'Mission-critical systems, avionics, satellite communications, and defense applications. Demands high reliability, radiation hardening, military standards compliance (MIL-STD), and secure communications.'
    },
    {
      value: 'Healthcare & Medical Devices',
      title: 'Healthcare & Medical Devices',
      description: 'Medical imaging, patient monitoring, diagnostic equipment, and connected health devices. Requires FDA compliance, patient safety standards (IEC 62304), data privacy (HIPAA), and ultra-low power consumption.'
    },
    {
      value: 'Industrial Automation',
      title: 'Industrial Automation',
      description: 'Factory automation, robotics control, industrial IoT, and process monitoring systems. Needs industrial-grade components, real-time control, harsh environment tolerance, and industrial communication protocols.'
    },
    {
      value: 'Other',
      title: 'Other Industries',
      description: 'Consumer electronics, smart home, retail, agriculture, energy, or custom applications. We\'ll work with you to understand your specific requirements and recommend the best configuration.'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Select Your Industry</h1>

          <form className="space-y-4">
            <RadioGroup defaultValue="Automotive" className="space-y-4">
              {industries.map((industry) => (
                <Card key={industry.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={industry.value}
                        id={industry.value.toLowerCase().replace(/\s+/g, '-')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={industry.value.toLowerCase().replace(/\s+/g, '-')}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {industry.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
            <div className="space-y-2">
              <Label htmlFor="otherIndustry">If Other, please specify:</Label>
              <Input
                type="text"
                id="otherIndustry"
                name="otherIndustry"
                placeholder="Enter your industry"
              />
            </div>
            <Link href="/core-platform-selection" passHref>
              <Button type="submit" className="w-full">
                Next
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndustryFocusPage;
