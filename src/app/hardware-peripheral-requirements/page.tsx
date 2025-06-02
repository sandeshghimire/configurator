import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const HardwarePeripheralRequirementsPage = () => {
  const peripherals = [
    'Sensors (e.g., Camera, LiDAR, IMU, Environmental)',
    'Display Interfaces (e.g., HDMI, LVDS, MIPI-DSI)',
    'Communication Modules (e.g., Wi-Fi, Bluetooth/BLE, Cellular (LTE/5G), Ethernet, CAN, GPS)',
    'Storage (e.g., eMMC, SD Card, NVMe)',
    'Specialized I/O (e.g., GPIO, SPI, I2C, ADCs/DACs)',
    'Power Management Requirements (e.g., Low Power, Battery Operated)',
    'Custom Enclosure Considerations',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          <h1 className="text-xl font-bold text-center">Select Hardware Peripheral Requirements</h1>
          <form className="space-y-4">
            <div className="max-h-80 overflow-y-auto space-y-3">
              {peripherals.map((peripheral) => (
                <div key={peripheral} className="flex items-start space-x-2">
                  <Checkbox id={peripheral.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="peripherals" value={peripheral} />
                  <Label htmlFor={peripheral.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal text-sm leading-relaxed">
                    {peripheral}
                  </Label>
                </div>
              ))}
            </div>
            <Link href="/middleware-frameworks" passHref>
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

export default HardwarePeripheralRequirementsPage;
