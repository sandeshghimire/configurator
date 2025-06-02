import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HardwarePeripheralRequirementsPage = () => {
  const peripherals = [
    {
      value: 'Sensors (e.g., Camera, LiDAR, IMU, Environmental)',
      title: 'Sensors',
      description: 'Camera modules for vision processing, LiDAR for distance measurement, IMU for motion sensing, environmental sensors for temperature/humidity/pressure. Requires appropriate interfaces (MIPI-CSI, I2C, SPI) and processing power for data handling.'
    },
    {
      value: 'Display Interfaces (e.g., HDMI, LVDS, MIPI-DSI)',
      title: 'Display Interfaces',
      description: 'HDMI for standard displays, LVDS for industrial panels, MIPI-DSI for mobile/embedded displays. Each interface has different bandwidth, resolution capabilities, and connector requirements. Essential for user interface applications.'
    },
    {
      value: 'Communication Modules (e.g., Wi-Fi, Bluetooth/BLE, Cellular (LTE/5G), Ethernet, CAN, GPS)',
      title: 'Communication Modules',
      description: 'Wi-Fi for local networking, Bluetooth/BLE for short-range devices, Cellular for wide-area connectivity, Ethernet for wired networks, CAN for automotive/industrial buses, GPS for positioning. Each adds complexity and power requirements.'
    },
    {
      value: 'Storage (e.g., eMMC, SD Card, NVMe)',
      title: 'Storage Solutions',
      description: 'eMMC for embedded storage, SD cards for removable storage, NVMe for high-performance applications. Storage choice affects boot time, data throughput, reliability, and expansion capabilities. Consider capacity and write endurance requirements.'
    },
    {
      value: 'Specialized I/O (e.g., GPIO, SPI, I2C, ADCs/DACs)',
      title: 'Specialized I/O',
      description: 'GPIO for general control, SPI for high-speed peripherals, I2C for sensor networks, ADCs for analog input, DACs for analog output. Essential for custom hardware integration and sensor interfacing. Affects pin count and connector design.'
    },
    {
      value: 'Power Management Requirements (e.g., Low Power, Battery Operated)',
      title: 'Power Management',
      description: 'Low power modes for energy efficiency, battery operation for portable devices, power sequencing for complex systems. Includes sleep states, dynamic voltage scaling, and battery charging circuits. Critical for portable and always-on applications.'
    },
    {
      value: 'Custom Enclosure Considerations',
      title: 'Custom Enclosure Considerations',
      description: 'Mechanical design requirements including size constraints, environmental protection (IP ratings), thermal management, connector accessibility, and mounting options. Affects PCB layout, component selection, and manufacturing approach.'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Select Hardware Peripheral Requirements</h1>

          <form className="space-y-4">
            <div className="space-y-4">
              {peripherals.map((peripheral) => (
                <Card key={peripheral.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={peripheral.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        name="peripherals"
                        value={peripheral.value}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={peripheral.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {peripheral.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {peripheral.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
