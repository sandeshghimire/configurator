import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OperatingSystemChoicePage = () => {
  const operatingSystems = [
    {
      value: 'Linux (e.g., Yocto Project, Debian-based)',
      title: 'Linux (Yocto Project, Debian-based)',
      description: 'Full-featured OS with rich ecosystem, extensive hardware support, and networking capabilities. Yocto provides custom embedded Linux builds, while Debian offers ready-to-use distributions. Best for: complex applications, networking, web services, and development flexibility.'
    },
    {
      value: 'Real-Time Operating System (RTOS) (e.g., QNX, FreeRTOS, Zephyr)',
      title: 'Real-Time Operating System (RTOS)',
      description: 'Deterministic operating systems guaranteeing response times for time-critical applications. QNX offers commercial-grade reliability, FreeRTOS provides open-source simplicity, Zephyr enables IoT optimization. Best for: control systems, safety-critical applications, real-time processing.'
    },
    {
      value: 'Bare-metal',
      title: 'Bare-metal',
      description: 'Direct hardware programming without an operating system layer. Provides maximum performance, minimal latency, and complete control over system resources. Requires extensive low-level programming expertise. Best for: ultra-low latency, minimal power consumption, simple dedicated functions.'
    },
    {
      value: 'Android (AOSP)',
      title: 'Android (AOSP)',
      description: 'Android Open Source Project providing familiar mobile-like user interface and app ecosystem. Includes touch interface support, multimedia capabilities, and Java/Kotlin development environment. Best for: consumer devices, touchscreen interfaces, multimedia applications.'
    },
    {
      value: 'Unsure / Needs Consultation',
      title: 'Unsure / Needs Consultation',
      description: 'Not sure which operating system fits your requirements? Our team will evaluate your performance needs, real-time constraints, development resources, and application complexity to recommend the optimal OS choice.'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Select Operating System</h1>

          <form className="space-y-4">
            <div className="space-y-4">
              {operatingSystems.map((os) => (
                <Card key={os.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={os.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        name="operatingSystems"
                        value={os.value}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={os.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {os.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {os.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
