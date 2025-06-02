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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Key Application Features</h1>
      <form className="space-y-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox id={feature.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="features" value={feature} />
            <Label htmlFor={feature.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal">
              {feature}
            </Label>
          </div>
        ))}
        <Link href="/cloud-connectivity-strategy" passHref>
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default KeyApplicationFeaturesPage;
