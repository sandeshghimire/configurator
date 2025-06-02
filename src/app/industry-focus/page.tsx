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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Your Industry</h1>
      <form>
        <RadioGroup defaultValue="Automotive" className="space-y-2 mb-6">
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <RadioGroupItem value={industry} id={industry.toLowerCase().replace(/\s+/g, '-', )} />
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
        <Link href="/contact-information" passHref> {/* Updated Link href */}
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link> {/* Close Link component */}
      </form>
    </div>
  );
};

export default IndustryFocusPage;
