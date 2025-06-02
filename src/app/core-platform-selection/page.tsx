import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CorePlatformSelectionPage = () => {
  const platforms = [
    {
      value: 'Raspberry Pi Solutions',
      title: 'Raspberry Pi Solutions',
      description: 'Cost-effective ARM-based platforms ideal for prototyping, education, and general-purpose IoT applications. Features rich GPIO, multiple connectivity options, and extensive community support. Best for: rapid prototyping, low-cost deployment, educational projects.'
    },
    {
      value: 'AMD Xilinx Zynq Solutions',
      title: 'AMD Xilinx Zynq Solutions',
      description: 'Heterogeneous SoCs combining ARM processors with FPGA fabric for hardware acceleration. Excellent for signal processing, real-time control, and custom hardware interfaces. Best for: high-performance computing, custom acceleration, adaptive algorithms.'
    },
    {
      value: 'NXP i.MX Industrial Platforms',
      title: 'NXP i.MX Industrial Platforms',
      description: 'Industrial-grade ARM processors designed for harsh environments and long-term availability. Features automotive-grade components, extended temperature ranges, and industrial certifications. Best for: industrial automation, automotive, long-lifecycle products.'
    },
    {
      value: 'NVIDIA Jetson Edge Computing',
      title: 'NVIDIA Jetson Edge Computing',
      description: 'AI-focused platforms with powerful GPU acceleration for machine learning and computer vision. Includes CUDA support, TensorRT optimization, and comprehensive AI software stack. Best for: AI/ML inference, computer vision, autonomous systems.'
    },
    {
      value: 'Unsure / Needs Consultation',
      title: 'Unsure / Needs Consultation',
      description: 'Not sure which platform fits your needs? Our engineers will analyze your requirements and recommend the optimal platform based on performance, power, cost, and feature requirements specific to your application.'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Select Core Platform</h1>

          <form className="space-y-4">
            <div className="space-y-4">
              {platforms.map((platform) => (
                <Card key={platform.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={platform.value.toLowerCase().replace(/\s+/g, '-')}
                        name="platforms"
                        value={platform.value}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={platform.value.toLowerCase().replace(/\s+/g, '-')}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {platform.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/operating-system-choice" passHref>
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

export default CorePlatformSelectionPage;
