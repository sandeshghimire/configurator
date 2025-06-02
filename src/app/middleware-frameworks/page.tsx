"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Layers, Zap, MessageSquare, Network, Brain, Code } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const MiddlewareFrameworksPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(formData.middlewareFrameworks || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const frameworks = [
    {
      value: 'gRPC',
      title: 'gRPC',
      icon: Network,
      description: 'High-performance, open-source RPC framework supporting multiple languages. Provides efficient binary serialization, bi-directional streaming, and strong typing. Ideal for microservices architecture and high-throughput distributed systems.'
    },
    {
      value: 'DDS (Data Distribution Service)',
      title: 'DDS (Data Distribution Service)',
      icon: Zap,
      description: 'Real-time publish-subscribe middleware standard for mission-critical applications. Provides deterministic data delivery, quality of service controls, and fault tolerance. Essential for aerospace, defense, and industrial automation systems.'
    },
    {
      value: 'ROS (Robot Operating System) / ROS 2',
      title: 'ROS (Robot Operating System) / ROS 2',
      icon: Layers,
      description: 'Comprehensive robotics middleware framework with extensive libraries for sensors, navigation, and control. ROS 2 adds real-time capabilities and improved security. Perfect for robotics, autonomous vehicles, and complex sensor integration.'
    },
    {
      value: 'MQTT',
      title: 'MQTT',
      icon: MessageSquare,
      description: 'Lightweight publish-subscribe messaging protocol optimized for IoT devices. Features low bandwidth usage, reliable delivery, and simple implementation. Ideal for IoT data collection, remote monitoring, and resource-constrained devices.'
    },
    {
      value: 'OPC UA',
      title: 'OPC UA',
      icon: Network,
      description: 'Industrial communication standard for secure, reliable data exchange in manufacturing. Provides platform independence, security features, and semantic data modeling. Essential for Industry 4.0, factory automation, and industrial IoT applications.'
    },
    {
      value: 'AI Frameworks (e.g., TensorFlow Lite, PyTorch Mobile, OpenVINO)',
      title: 'AI Frameworks',
      icon: Brain,
      description: 'Optimized machine learning frameworks for edge deployment. TensorFlow Lite for mobile/embedded, PyTorch Mobile for research-to-production, OpenVINO for Intel hardware acceleration. Essential for on-device AI inference and computer vision.'
    },
    {
      value: 'Custom APIs / SDK',
      title: 'Custom APIs / SDK',
      icon: Code,
      description: 'Bespoke application programming interfaces and software development kits tailored to specific requirements. Enables proprietary protocols, legacy system integration, and specialized functionality not covered by standard frameworks.'
    }
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedFrameworks(prev => {
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
    updateFormData('middlewareFrameworks', selectedFrameworks);

    // Mark step as completed
    markStepCompleted('middleware-frameworks');

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push('/driver-development-needs');
  };

  return (
    <PageLayout
      title="Middleware & Frameworks"
      description="Select the middleware components and frameworks your embedded system will use for communication and data processing."
      stepId="middleware-frameworks"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {frameworks.map((framework) => (
            <Card
              key={framework.value}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${selectedFrameworks.includes(framework.value)
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <CardContent className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-start space-x-4 mb-4">
                    <Checkbox
                      id={framework.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                      checked={selectedFrameworks.includes(framework.value)}
                      onCheckedChange={() => handleCheckboxChange(framework.value)}
                      className="mt-1 flex-shrink-0"
                    />
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <framework.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={framework.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                        className="font-semibold text-lg cursor-pointer text-gray-900 block leading-tight"
                      >
                        {framework.title}
                      </Label>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {framework.description}
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
                Continue to Driver Development
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default MiddlewareFrameworksPage;
