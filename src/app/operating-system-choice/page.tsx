import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const OperatingSystemChoicePage = () => {
  const operatingSystems = [
    'Linux (e.g., Yocto Project, Debian-based)',
    'Real-Time Operating System (RTOS) (e.g., QNX, FreeRTOS, Zephyr)',
    'Bare-metal',
    'Android (AOSP)',
    'Unsure / Needs Consultation',
  ];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Operating System</h1>
      <form className="space-y-4">
        {operatingSystems.map((os) => (
          <div key={os} className="flex items-center space-x-2">
            <Checkbox id={os.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="operatingSystems" value={os} />
            <Label htmlFor={os.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal">
              {os}
            </Label>
          </div>
        ))}
        <Link href="/driver-development-needs" passHref> {/* Add Link component */}
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link> {/* Close Link component */}
      </form>
    </div>
  );
};

export default OperatingSystemChoicePage;
