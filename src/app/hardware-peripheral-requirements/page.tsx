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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Hardware Peripheral Requirements</h1>
      <form className="space-y-4">
        {peripherals.map((peripheral) => (
          <div key={peripheral} className="flex items-center space-x-2">
            <Checkbox id={peripheral.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="peripherals" value={peripheral} />
            <Label htmlFor={peripheral.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal">
              {peripheral}
            </Label>
          </div>
        ))}
        <Link href="/operating-system-choice" passHref> {/* Add Link component */}
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link> {/* Close Link component */}
      </form>
    </div>
  );
};

export default HardwarePeripheralRequirementsPage;
