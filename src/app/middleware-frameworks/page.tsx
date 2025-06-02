import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MiddlewareFrameworksPage = () => {
  const frameworks = [
    {
      value: 'gRPC',
      title: 'gRPC',
      description: 'High-performance, open-source RPC framework supporting multiple languages. Provides efficient binary serialization, bi-directional streaming, and strong typing. Ideal for microservices architecture and high-throughput distributed systems.'
    },
    {
      value: 'DDS (Data Distribution Service)',
      title: 'DDS (Data Distribution Service)',
      description: 'Real-time publish-subscribe middleware standard for mission-critical applications. Provides deterministic data delivery, quality of service controls, and fault tolerance. Essential for aerospace, defense, and industrial automation systems.'
    },
    {
      value: 'ROS (Robot Operating System) / ROS 2',
      title: 'ROS (Robot Operating System) / ROS 2',
      description: 'Comprehensive robotics middleware framework with extensive libraries for sensors, navigation, and control. ROS 2 adds real-time capabilities and improved security. Perfect for robotics, autonomous vehicles, and complex sensor integration.'
    },
    {
      value: 'MQTT',
      title: 'MQTT',
      description: 'Lightweight publish-subscribe messaging protocol optimized for IoT devices. Features low bandwidth usage, reliable delivery, and simple implementation. Ideal for IoT data collection, remote monitoring, and resource-constrained devices.'
    },
    {
      value: 'OPC UA',
      title: 'OPC UA',
      description: 'Industrial communication standard for secure, reliable data exchange in manufacturing. Provides platform independence, security features, and semantic data modeling. Essential for Industry 4.0, factory automation, and industrial IoT applications.'
    },
    {
      value: 'AI Frameworks (e.g., TensorFlow Lite, PyTorch Mobile, OpenVINO)',
      title: 'AI Frameworks',
      description: 'Optimized machine learning frameworks for edge deployment. TensorFlow Lite for mobile/embedded, PyTorch Mobile for research-to-production, OpenVINO for Intel hardware acceleration. Essential for on-device AI inference and computer vision.'
    },
    {
      value: 'Custom APIs / SDK',
      title: 'Custom APIs / SDK',
      description: 'Bespoke application programming interfaces and software development kits tailored to specific requirements. Enables proprietary protocols, legacy system integration, and specialized functionality not covered by standard frameworks.'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Select Middleware & Frameworks</h1>

          <form className="space-y-4">
            <div className="space-y-4">
              {frameworks.map((framework) => (
                <Card key={framework.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={framework.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        name="frameworks"
                        value={framework.value}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={framework.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {framework.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {framework.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Link href="/driver-development-needs" passHref>
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

export default MiddlewareFrameworksPage;
