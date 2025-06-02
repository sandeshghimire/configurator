import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DriverDevelopmentNeedsPage = () => {
  const driverNeeds = [
    {
      value: 'Custom Peripheral Drivers',
      title: 'Custom Peripheral Drivers',
      description: 'Development of new device drivers for proprietary or uncommon hardware components. Includes register-level programming, interrupt handling, and hardware abstraction layers. Required for unique sensors, custom ASICs, or specialized peripherals not supported by existing drivers.'
    },
    {
      value: 'Existing Driver Integration & Modification',
      title: 'Existing Driver Integration & Modification',
      description: 'Adapting and integrating existing open-source or vendor-provided drivers into your system. May involve porting between operating systems, optimization for specific use cases, or bug fixes. Less complex than custom development but requires driver architecture knowledge.'
    },
    {
      value: 'BSP (Board Support Package) Customization',
      title: 'BSP (Board Support Package) Customization',
      description: 'Low-level platform initialization code including bootloader modifications, device tree configuration, pin multiplexing, and hardware bring-up. Essential for custom board designs and ensures proper hardware initialization and resource allocation.'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Select Driver Development Needs</h1>

          <form className="space-y-4">
            <div className="space-y-4">
              {driverNeeds.map((need) => (
                <Card key={need.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={need.value.toLowerCase().replace(/\s+/g, '-')}
                        name="driverNeeds"
                        value={need.value}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={need.value.toLowerCase().replace(/\s+/g, '-')}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {need.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {need.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
