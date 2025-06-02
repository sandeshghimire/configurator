"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HardDrive, Camera, Wifi, Database, Cpu, FileX } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const HardwarePeripheralRequirementsPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(formData.hardwareRequirements || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const peripherals = [
    {
      value: 'Sensors (e.g., Camera, LiDAR, IMU, Environmental)',
      title: 'Sensors',
      icon: Camera,
      description: 'Camera modules for vision processing, LiDAR for distance measurement, IMU for motion sensing, environmental sensors for temperature/humidity/pressure. Requires appropriate interfaces (MIPI-CSI, I2C, SPI) and processing power for data handling.'
    },
    {
      value: 'Display Interfaces (e.g., HDMI, LVDS, MIPI-DSI)',
      title: 'Display Interfaces',
      icon: HardDrive,
      description: 'HDMI for standard displays, LVDS for industrial panels, MIPI-DSI for mobile/embedded displays. Each interface has different bandwidth, resolution capabilities, and connector requirements. Essential for user interface applications.'
    },
    {
      value: 'Communication Modules (e.g., Wi-Fi, Bluetooth/BLE, Cellular (LTE/5G), Ethernet, CAN, GPS)',
      title: 'Communication Modules',
      icon: Wifi,
      description: 'Wi-Fi for local networking, Bluetooth/BLE for short-range devices, Cellular for wide-area connectivity, Ethernet for wired networks, CAN for automotive/industrial buses, GPS for positioning. Each adds complexity and power requirements.'
    },
    {
      value: 'Storage (e.g., eMMC, SD Card, NVMe)',
      title: 'Storage Solutions',
      icon: Database,
      description: 'eMMC for embedded storage, SD cards for removable storage, NVMe for high-performance applications. Storage choice affects boot time, data throughput, reliability, and expansion capabilities. Consider capacity and write endurance requirements.'
    },
    {
      value: 'Specialized I/O (e.g., GPIO, SPI, I2C, ADCs/DACs)',
      title: 'Specialized I/O',
      icon: Cpu,
      description: 'GPIO for general control, SPI for high-speed peripherals, I2C for sensor networks, ADCs for analog input, DACs for analog output. Essential for custom hardware integration and sensor interfacing. Affects pin count and connector design.'
    },
    {
      value: 'Power Management Requirements (e.g., Low Power, Battery Operated)',
      title: 'Power Management',
      icon: HardDrive,
      description: 'Low power modes for energy efficiency, battery operation for portable devices, power sequencing for complex systems. Includes sleep states, dynamic voltage scaling, and battery charging circuits. Critical for portable and always-on applications.'
    },
    {
      value: 'Custom Enclosure Considerations',
      title: 'Custom Enclosure Considerations',
      icon: FileX,
      description: 'Mechanical design requirements including size constraints, environmental protection (IP ratings), thermal management, connector accessibility, and mounting options. Affects PCB layout, component selection, and manufacturing approach.'
    }
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedRequirements(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Update form data
    updateFormData('hardwareRequirements', selectedRequirements);

    // Mark step as completed
    markStepCompleted('hardware-peripheral-requirements');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push('/middleware-frameworks');
  };

  return (
    <PageLayout
      title="Hardware & Peripheral Requirements"
      description="Select the hardware components and peripheral interfaces your embedded system will need."
      stepId="hardware-peripheral-requirements"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {peripherals.map((peripheral) => (
            <Card
              key={peripheral.value}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${selectedRequirements.includes(peripheral.value)
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <CardContent className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-start space-x-4 mb-4">
                    <Checkbox
                      id={peripheral.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                      checked={selectedRequirements.includes(peripheral.value)}
                      onCheckedChange={() => handleCheckboxChange(peripheral.value)}
                      className="mt-1 flex-shrink-0"
                    />
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <peripheral.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={peripheral.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        className="font-semibold text-lg cursor-pointer text-gray-900 block leading-tight"
                      >
                        {peripheral.title}
                      </Label>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {peripheral.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Continue to Middleware & Frameworks
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default HardwarePeripheralRequirementsPage;
