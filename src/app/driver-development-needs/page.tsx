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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Driver Development Needs</h1>
      <form className="space-y-4">
        {driverNeeds.map((need) => (
          <div key={need} className="flex items-center space-x-2">
            <Checkbox id={need.toLowerCase().replace(/\s+/g, '-')} name="driverNeeds" value={need} />
            <Label htmlFor={need.toLowerCase().replace(/\s+/g, '-')} className="font-normal">
              {need}
            </Label>
          </div>
        ))}
        <Link href="/middleware-frameworks" passHref> {/* Add Link component */}
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link> {/* Close Link component */}
      </form>
    </div>
  );
};

export default DriverDevelopmentNeedsPage;
