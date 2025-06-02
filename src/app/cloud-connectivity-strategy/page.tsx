import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CloudConnectivityStrategyPage = () => {
  const cloudPlatforms = [
    {
      id: "aws",
      label: "AWS",
      description: "Amazon Web Services - comprehensive cloud platform with IoT Core, extensive edge services, and global infrastructure. Strong enterprise features, machine learning services, and robust security. Best for: scalable enterprise solutions, complex data processing, global deployments."
    },
    {
      id: "azure",
      label: "Azure",
      description: "Microsoft Azure - enterprise-focused cloud with IoT Central, strong hybrid capabilities, and seamless Office 365 integration. Excellent for organizations using Microsoft ecosystem. Best for: enterprise environments, hybrid cloud, Microsoft technology stacks."
    },
    {
      id: "gcp",
      label: "Google Cloud Platform",
      description: "Google Cloud Platform - analytics and AI-focused cloud with IoT Core and powerful data processing capabilities. Strong in machine learning and real-time analytics. Best for: data analytics, AI/ML workloads, real-time processing."
    },
    {
      id: "private-cloud",
      label: "Private Cloud",
      description: "Dedicated cloud infrastructure for enhanced security and control. Provides cloud benefits while maintaining data sovereignty and compliance requirements. Best for: sensitive data, regulatory compliance, customized environments."
    },
    {
      id: "on-premise-only",
      label: "On-Premise Only",
      description: "Local infrastructure without cloud connectivity. Maximum data control and security but limited scalability and remote access. Best for: air-gapped environments, sensitive applications, minimal connectivity requirements."
    },
    {
      id: "undecided-cloud",
      label: "Undecided",
      description: "Need help choosing the right cloud strategy? Our team will evaluate your requirements including data sensitivity, compliance needs, scalability requirements, and budget to recommend the optimal approach."
    }
  ];

  const iotIntegrationOptions = [
    {
      value: "yes-iot",
      title: "Yes - IoT Platform Integration",
      description: "Integrate with managed IoT platforms for device management, fleet management, over-the-air updates, and centralized monitoring. Provides enterprise-grade device lifecycle management and operational insights."
    },
    {
      value: "no-iot",
      title: "No IoT Platform Integration",
      description: "Direct cloud connectivity without managed IoT platform services. Uses basic cloud services for data storage and processing. Suitable for simple deployments or custom integration requirements."
    },
    {
      value: "undecided-iot",
      title: "Undecided on IoT Platform",
      description: "Not sure if IoT platform integration is needed? We'll help evaluate your device management needs, scalability requirements, and operational complexity to recommend the best approach."
    }
  ];

  const dataProcessingNeeds = [
    {
      id: "edge-ai",
      label: "Edge AI Processing",
      description: "On-device artificial intelligence and machine learning for real-time inference, reduced latency, and privacy preservation. Requires powerful edge hardware and optimized AI frameworks."
    },
    {
      id: "cloud-ai-ml",
      label: "Cloud-based AI/ML",
      description: "Server-side machine learning processing with access to powerful compute resources and large datasets. Enables complex models and continuous learning but requires reliable connectivity."
    },
    {
      id: "real-time-streaming",
      label: "Real-time Data Streaming",
      description: "Continuous data transmission for live monitoring, real-time analytics, and immediate response capabilities. Essential for time-critical applications and live dashboards."
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <h1 className="text-xl font-bold text-center">Cloud & Connectivity Strategy</h1>

          <form className="space-y-6">
            {/* Cloud Platform Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Cloud Platform Preferences</h2>
              {cloudPlatforms.map((platform) => (
                <Card key={platform.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox id={platform.id} value={platform.label} className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor={platform.id}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {platform.label}
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

            {/* IoT Platform Integration */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">IoT Platform Integration</h2>
              <RadioGroup defaultValue="undecided-iot" className="space-y-4">
                {iotIntegrationOptions.map((option) => (
                  <Card key={option.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                        <div className="flex-1">
                          <Label
                            htmlFor={option.value}
                            className="font-semibold text-base cursor-pointer"
                          >
                            {option.title}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </div>

            {/* Data Processing Needs */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Data Processing Requirements</h2>
              {dataProcessingNeeds.map((need) => (
                <Card key={need.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox id={need.id} value={need.label} className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor={need.id}
                          className="font-semibold text-base cursor-pointer"
                        >
                          {need.label}
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

            <Link href="/contact-information" passHref>
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

export default CloudConnectivityStrategyPage;
