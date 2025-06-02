import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CorePlatformSelectionPage = () => {
  const platforms = [
    'Raspberry Pi Solutions',
    'AMD Xilinx Zynq Solutions',
    'NXP i.MX Industrial Platforms',
    'NVIDIA Jetson Edge Computing',
    'Unsure / Needs Consultation',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-xl font-bold text-center">Select Core Platform</h1>
          <form className="space-y-4">
            {platforms.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox id={platform.toLowerCase().replace(/\s+/g, '-')} name="platforms" value={platform} />
                <Label htmlFor={platform.toLowerCase().replace(/\s+/g, '-')} className="font-normal">
                  {platform}
                </Label>
              </div>
            ))}
            <Link href="/operating-system-choice" passHref>
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

export default CorePlatformSelectionPage;
