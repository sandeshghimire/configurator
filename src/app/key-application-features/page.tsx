"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Database, Monitor, Globe, Smartphone, AlertTriangle, BarChart3 } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const KeyApplicationFeaturesPage = () => {
  const router = useRouter();
  const { formData, updateFormData, markStepCompleted } = useConfigurator();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(formData.keyFeatures || []);
  const [isSubmitting, setIsSubmitting] = useState(false);eact from 'react';
  import Link from 'next/link'; // Import Link
  import { Button } from "@/components/ui/button";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Label } from "@/components/ui/label";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

  const KeyApplicationFeaturesPage = () => {
    const features = [
      {
        value: 'Over-The-Air (OTA) Updates',
        title: 'Over-The-Air (OTA) Updates',
        description: 'Remote firmware and software updates without physical access. Enables continuous improvement, bug fixes, and feature additions throughout product lifecycle. Requires secure update mechanisms and rollback capabilities.'
      },
      {
        value: 'Real-time Performance Monitoring & Diagnostics',
        title: 'Real-time Performance Monitoring & Diagnostics',
        description: 'Continuous system health monitoring including CPU usage, memory, temperature, and custom metrics. Enables predictive maintenance and performance optimization. Essential for mission-critical applications.'
      },
      {
        value: 'Alarm & Fault Management System',
        title: 'Alarm & Fault Management System',
        description: 'Automated detection, classification, and notification of system faults and abnormal conditions. Includes configurable thresholds, escalation procedures, and fault logging for troubleshooting and compliance.'
      },
      {
        value: 'Data Logging & Analytics',
        title: 'Data Logging & Analytics',
        description: 'Systematic collection, storage, and analysis of operational data. Supports historical trending, performance analysis, and regulatory compliance. Includes local storage and cloud synchronization options.'
      },
      {
        value: 'Local User Interface (UI/UX)',
        title: 'Local User Interface (UI/UX)',
        description: 'On-device user interface for direct interaction via touchscreen, buttons, or display. Includes configuration menus, status displays, and control interfaces. Requires UI framework and display hardware integration.'
      },
      {
        value: 'Web-based Control/Monitoring Dashboard',
        title: 'Web-based Control/Monitoring Dashboard',
        description: 'Browser-accessible interface for remote monitoring and control. Enables multi-user access, responsive design for various devices, and integration with existing IT infrastructure. Requires web server and security features.'
      },
      {
        value: 'Mobile Application Integration',
        title: 'Mobile Application Integration',
        description: 'Smartphone/tablet app connectivity via Bluetooth, Wi-Fi, or cellular. Provides portable monitoring, configuration, and control capabilities. Includes API development and mobile app frameworks.'
      },
      {
        value: 'Secure Boot & Device Security',
        title: 'Secure Boot & Device Security',
        description: 'Cryptographic verification of firmware integrity, secure key storage, and protection against tampering. Essential for critical applications and regulatory compliance. Includes hardware security modules and encryption.'
      }
    ];

    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto space-y-6">
            <h1 className="text-xl font-bold text-center">Select Key Application Features</h1>

            <form className="space-y-4">
              <div className="space-y-4">
                {features.map((feature) => (
                  <Card key={feature.value} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={feature.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                          name="features"
                          value={feature.value}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={feature.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                            className="font-semibold text-base cursor-pointer"
                          >
                            {feature.title}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Link href="/hardware-peripheral-requirements" passHref>
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

  export default KeyApplicationFeaturesPage;
