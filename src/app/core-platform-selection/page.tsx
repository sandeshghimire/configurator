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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Core Platform</h1>
      <form className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform} className="flex items-center space-x-2">
            <Checkbox id={platform.toLowerCase().replace(/\s+/g, '-')} name="platforms" value={platform} />
            <Label htmlFor={platform.toLowerCase().replace(/\s+/g, '-')} className="font-normal">
              {platform}
            </Label>
          </div>
        ))}
        <Link href="/hardware-peripheral-requirements" passHref> {/* Updated Link href */}
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link> {/* Close Link component */}
      </form>
    </div>
  );
};

export default CorePlatformSelectionPage;
