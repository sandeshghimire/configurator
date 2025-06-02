import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DriverDevelopmentNeedsPage = () => {
  const driverNeeds = [
    'Custom Peripheral Drivers',
    'Existing Driver Integration & Modification',
    'BSP (Board Support Package) Customization',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-xl font-bold text-center">Select Driver Development Needs</h1>
          <form className="space-y-4">
            {driverNeeds.map((need) => (
              <div key={need} className="flex items-center space-x-2">
                <Checkbox id={need.toLowerCase().replace(/\s+/g, '-')} name="driverNeeds" value={need} />
                <Label htmlFor={need.toLowerCase().replace(/\s+/g, '-')} className="font-normal">
                  {need}
                </Label>
              </div>
            ))}
            <Link href="/cloud-connectivity-strategy" passHref>
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

export default DriverDevelopmentNeedsPage;
