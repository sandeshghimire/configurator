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
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-xl font-bold text-center">Select Operating System</h1>
          <form className="space-y-4">
            {operatingSystems.map((os) => (
              <div key={os} className="flex items-center space-x-2">
                <Checkbox id={os.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="operatingSystems" value={os} />
                <Label htmlFor={os.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal text-sm">
                  {os}
                </Label>
              </div>
            ))}
            <Link href="/key-application-features" passHref>
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

export default OperatingSystemChoicePage;
