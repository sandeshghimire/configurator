import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const KeyApplicationFeaturesPage = () => {
  const features = [
    'Over-The-Air (OTA) Updates',
    'Real-time Performance Monitoring & Diagnostics',
    'Alarm & Fault Management System',
    'Data Logging & Analytics',
    'Local User Interface (UI/UX)',
    'Web-based Control/Monitoring Dashboard',
    'Mobile Application Integration',
    'Secure Boot & Device Security',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-xl font-bold text-center">Select Key Application Features</h1>
          <form className="space-y-4">
            <div className="max-h-80 overflow-y-auto space-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox id={feature.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="features" value={feature} />
                  <Label htmlFor={feature.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal text-sm">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
            <Link href="/hardware-peripheral-requirements" passHref>
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

export default KeyApplicationFeaturesPage;
