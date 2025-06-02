import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const IndustryFocusPage = () => {
  const industries = [
    'Automotive',
    'Aerospace & Defense',
    'Healthcare & Medical Devices',
    'Industrial Automation',
    'Other',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-xl font-bold text-center">Select Your Industry</h1>
          <form className="space-y-4">
            <RadioGroup defaultValue="Automotive" className="space-y-3">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <RadioGroupItem value={industry} id={industry.toLowerCase().replace(/\s+/g, '-',)} />
                  <Label htmlFor={industry.toLowerCase().replace(/\s+/g, '-')}>{industry}</Label>
                </div>
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
