"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Edit,
  Send,
  Download,
  Clock,
  AlertCircle,
  ArrowLeft,
  Loader2,
  FileText,
  User,
  Building,
  Phone,
  Mail,
  Calendar,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Cloud,
  Code,
  Settings,
  Zap,
  Star,
  Target,
  Info,
  Copy,
  Check
} from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";
import { cn } from "@/lib/utils";

const ReviewSubmitPage = () => {
  const { formData, markStepCompleted } = useConfigurator();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'markdown' | 'cards'>('markdown');

  // Comprehensive mapping of options to their detailed descriptions
  const optionDescriptions = {
    // Core Platforms
    'Raspberry Pi Solutions': 'Cost-effective ARM-based platforms ideal for prototyping, education, and general-purpose IoT applications. Features rich GPIO, multiple connectivity options, and extensive community support.',
    'AMD Xilinx Zynq Solutions': 'Heterogeneous SoCs combining ARM processors with FPGA fabric for hardware acceleration. Excellent for signal processing, real-time control, and custom hardware interfaces.',
    'NXP i.MX Industrial Platforms': 'Industrial-grade ARM processors designed for harsh environments and long-term availability. Features automotive-grade components, extended temperature ranges, and industrial certifications.',
    'NVIDIA Jetson Edge Computing': 'AI-focused platforms with powerful GPU acceleration for machine learning and computer vision. Includes CUDA support, TensorRT optimization, and comprehensive AI software stack.',

    // Operating Systems
    'Linux (e.g., Yocto Project, Debian-based)': 'Full-featured OS with rich ecosystem, extensive hardware support, and networking capabilities. Yocto provides custom embedded Linux builds, while Debian offers ready-to-use distributions.',
    'Real-Time Operating System (RTOS) (e.g., QNX, FreeRTOS, Zephyr)': 'Deterministic operating systems guaranteeing response times for time-critical applications. QNX offers commercial-grade reliability, FreeRTOS provides open-source simplicity.',
    'Bare-metal': 'Direct hardware programming without an operating system layer. Provides maximum performance, minimal latency, and complete control over system resources.',
    'Android (AOSP)': 'Android Open Source Project providing familiar mobile-like user interface and app ecosystem. Includes touch interface support, multimedia capabilities, and Java/Kotlin development environment.',

    // Key Features
    'Real-time Data Processing & Analytics': 'Immediate processing and analysis of incoming data streams with low latency requirements. Essential for control systems, monitoring applications, and time-sensitive decision making.',
    'Data Logging & Historical Analysis': 'Systematic collection, storage, and analysis of operational data. Supports historical trending, performance analysis, and regulatory compliance with local storage and cloud synchronization.',
    'Local User Interface (UI/UX)': 'On-device user interface for direct interaction via touchscreen, buttons, or display. Includes configuration menus, status displays, and control interfaces.',
    'Web-based Control/Monitoring Dashboard': 'Browser-accessible interface for remote monitoring and control. Enables multi-user access, responsive design for various devices, and integration with existing IT infrastructure.',
    'Mobile Application Integration': 'Smartphone/tablet app connectivity via Bluetooth, Wi-Fi, or cellular. Provides portable monitoring, configuration, and control capabilities with API development and mobile frameworks.',
    'Secure Boot & Device Security': 'Cryptographic verification of firmware integrity, secure key storage, and protection against tampering. Essential for critical applications and regulatory compliance.',

    // Hardware Requirements
    'Sensors & Input Devices (e.g., Camera, LiDAR, IMU)': 'Camera modules for vision processing, LiDAR for distance measurement, IMU for motion sensing, environmental sensors for temperature/humidity/pressure.',
    'Display Interfaces (e.g., HDMI, LVDS, MIPI-DSI)': 'HDMI for standard displays, LVDS for industrial panels, MIPI-DSI for mobile/embedded displays. Each interface has different bandwidth and resolution capabilities.',
    'Communication Modules (e.g., Wi-Fi, Bluetooth/BLE, Cellular (LTE/5G), Ethernet, CAN, GPS)': 'Wi-Fi for local networking, Bluetooth/BLE for short-range devices, Cellular for wide-area connectivity, Ethernet for wired networks, CAN for automotive/industrial buses.',
    'Storage (e.g., eMMC, SD Card, NVMe)': 'eMMC for embedded storage, SD cards for removable storage, NVMe for high-performance applications. Storage choice affects boot time, data throughput, and reliability.',
    'Specialized I/O (e.g., GPIO, SPI, I2C, ADCs/DACs)': 'GPIO for general control, SPI for high-speed peripherals, I2C for sensor networks, ADCs for analog input, DACs for analog output.',
    'Power Management Requirements (e.g., Low Power, Battery Operated)': 'Low power modes for energy efficiency, battery operation for portable devices, power sequencing for complex systems. Includes sleep states and dynamic voltage scaling.',
    'Custom Enclosure Considerations': 'Mechanical design requirements including size constraints, environmental protection (IP ratings), thermal management, connector accessibility, and mounting options.',

    // Middleware & Frameworks
    'gRPC': 'High-performance, open-source RPC framework supporting multiple languages. Provides efficient binary serialization, bi-directional streaming, and strong typing.',
    'DDS (Data Distribution Service)': 'Real-time publish-subscribe middleware standard for mission-critical applications. Provides deterministic data delivery, quality of service controls, and fault tolerance.',
    'ROS (Robot Operating System) / ROS 2': 'Comprehensive robotics middleware framework with extensive libraries for sensors, navigation, and control. ROS 2 adds real-time capabilities and improved security.',
    'MQTT': 'Lightweight publish-subscribe messaging protocol optimized for IoT devices. Features low bandwidth usage, reliable delivery, and simple implementation.',
    'OPC UA': 'Industrial communication standard for secure, reliable data exchange in manufacturing. Provides platform independence, security features, and semantic data modeling.',
    'AI Frameworks (e.g., TensorFlow Lite, PyTorch Mobile, OpenVINO)': 'Optimized machine learning frameworks for edge deployment. TensorFlow Lite for mobile/embedded, PyTorch Mobile for research-to-production.',
    'Custom APIs / SDK': 'Bespoke application programming interfaces and software development kits tailored to specific requirements. Enables proprietary protocols and legacy system integration.',

    // Driver Development
    'Custom Peripheral Drivers': 'Development of new device drivers for proprietary or uncommon hardware components. Includes register-level programming, interrupt handling, and hardware abstraction layers.',
    'Existing Driver Integration & Modification': 'Adapting and integrating existing open-source or vendor-provided drivers into your system. May involve porting between operating systems and optimization.',
    'BSP (Board Support Package) Customization': 'Low-level platform initialization code including bootloader modifications, device tree configuration, pin multiplexing, and hardware bring-up.',

    // Cloud Strategies
    'cloud-first': 'Prioritizes cloud-native architecture with primary data processing and storage in the cloud. Minimizes edge processing and maximizes scalability.',
    'hybrid-cloud': 'Balances edge and cloud processing based on latency, bandwidth, and privacy requirements. Provides flexibility and redundancy.',
    'edge-computing': 'Emphasizes local processing to reduce latency and bandwidth usage. Suitable for real-time applications and intermittent connectivity.',
    'on-premise': 'Keeps all data and processing within local infrastructure. Provides maximum control over data privacy and security.',

    // IoT Integration
    'direct-cloud': 'Direct device-to-cloud communication without intermediate gateways. Simplifies architecture but requires robust device connectivity.',
    'gateway-based': 'Uses local gateways to aggregate and process data before cloud transmission. Provides protocol translation and local intelligence.',
    'mesh-networking': 'Devices communicate through peer-to-peer mesh networks for improved coverage and redundancy. Suitable for distributed sensor networks.',
    'no-iot': 'Standalone system without cloud or network connectivity requirements. Focuses on local operation and data storage.',

    // Cloud Platforms
    'aws': 'Amazon Web Services - comprehensive cloud platform with IoT Core, extensive edge services, and global infrastructure. Strong enterprise features, machine learning services, and robust security.',
    'azure': 'Microsoft Azure - enterprise-focused cloud with IoT Central, strong hybrid capabilities, and seamless Office 365 integration. Excellent for organizations using Microsoft ecosystem.',
    'gcp': 'Google Cloud Platform - analytics and AI-focused cloud with IoT Core and powerful data processing capabilities. Strong in machine learning and real-time analytics.',
    'private-cloud': 'Dedicated cloud infrastructure for enhanced security and control. Provides cloud benefits while maintaining data sovereignty and compliance requirements.',
    'on-premise-only': 'Local infrastructure without cloud connectivity. Maximum data control and security but limited scalability and remote access.',
    'iot-platform-integration': 'Integrate with managed IoT platforms for device management, fleet management, over-the-air updates, and centralized monitoring.',
    'direct-cloud-connectivity': 'Direct cloud connectivity without managed IoT platform services. Uses basic cloud services for data storage and processing.',

    // Data Processing Options
    'edge-ai-processing': 'On-device artificial intelligence and machine learning for real-time inference, reduced latency, and privacy preservation. Requires powerful edge hardware and optimized AI frameworks.',
    'cloud-ai-ml': 'Server-side machine learning processing with access to powerful compute resources and large datasets. Enables complex models and continuous learning but requires reliable connectivity.',
    'real-time-streaming': 'Continuous data transmission for live monitoring, real-time analytics, and immediate response capabilities. Essential for time-critical applications and live dashboards.',

    // Additional Core Platforms
    'Unsure / Needs Consultation': 'Not sure which platform fits your needs? Our engineers will analyze your requirements and recommend the optimal platform based on performance, power, cost, and feature requirements specific to your application.'
  };

  // Helper function to get description for an option
  const getOptionDescription = (option: string): string => {
    return optionDescriptions[option as keyof typeof optionDescriptions] || '';
  };

  // Helper function to get display-friendly labels
  const getDisplayLabel = (value: string): string => {
    const labelMappings: { [key: string]: string } = {
      // Cloud strategies
      'cloud-first': 'Cloud-First Approach',
      'hybrid-cloud': 'Hybrid Cloud Architecture',
      'edge-computing': 'Edge Computing Focus',
      'on-premise': 'On-Premise Solution',

      // IoT integration options
      'direct-cloud': 'Direct Cloud Integration',
      'gateway-based': 'Gateway-Based Architecture',
      'mesh-networking': 'Mesh Networking',
      'no-iot': 'No IoT Integration Required'
    };

    return labelMappings[value] || value;
  };

  // Enhanced section configuration with better organization
  const configurationSections = [
    {
      id: 'configuration-details',
      title: 'Configuration Overview',
      icon: FileText,
      description: 'Project title and description',
      editLink: '/configuration-details',
      renderContent: () => {
        if (!formData.title) return null;
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                {formData.title}
              </h4>
              {formData.description && (
                <p className="text-gray-700 leading-relaxed">
                  {formData.description}
                </p>
              )}
            </div>
          </div>
        );
      }
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      icon: User,
      description: 'Project contact details',
      editLink: '/contact-information',
      renderContent: () => {
        if (!formData.contactInfo) return null;
        const contact = formData.contactInfo;
        return (
          <div className="grid md:grid-cols-2 gap-4">
            {contact.fullName && (
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{contact.fullName}</p>
                </div>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{contact.email}</p>
                </div>
              </div>
            )}
            {contact.companyName && (
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-medium">{contact.companyName}</p>
                </div>
              </div>
            )}
            {contact.phoneNumber && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{contact.phoneNumber}</p>
                </div>
              </div>
            )}
            {contact.projectDescription && (
              <div className="md:col-span-2">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Project Description</p>
                    <p className="font-medium text-gray-900 leading-relaxed">
                      {contact.projectDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
    },
    {
      id: 'industry-focus',
      title: 'Industry & Market Focus',
      icon: Target,
      description: 'Target industry and specific market segment',
      editLink: '/industry-focus',
      renderContent: () => {
        if (!formData.industryFocus) return null;
        return (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Primary Industry</p>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {formData.industryFocus}
              </Badge>
            </div>
            {formData.otherIndustry && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Specific Market Segment</p>
                <p className="text-gray-900 font-medium">{formData.otherIndustry}</p>
              </div>
            )}
          </div>
        );
      }
    },
    {
      id: 'core-platforms',
      title: 'Core Platform Architecture',
      icon: Cpu,
      description: 'Selected hardware platforms and processing units',
      editLink: '/core-platform-selection',
      renderContent: () => {
        if (!formData.corePlatforms?.length) return null;
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Selected Platforms</p>
            <div className="space-y-3">
              {formData.corePlatforms.map((platform, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="px-3 py-1">
                      <Cpu className="w-3 h-3 mr-1" />
                      {platform}
                    </Badge>
                  </div>
                  {getOptionDescription(platform) && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getOptionDescription(platform)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      id: 'operating-system',
      title: 'Operating System',
      icon: HardDrive,
      description: 'Selected operating system for the embedded platform',
      editLink: '/operating-system-choice',
      renderContent: () => {
        if (!formData.operatingSystem) return null;
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <HardDrive className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Operating System</p>
                <p className="font-semibold text-lg text-gray-900">
                  {formData.operatingSystem}
                </p>
              </div>
            </div>
            {getOptionDescription(formData.operatingSystem) && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {getOptionDescription(formData.operatingSystem)}
                </p>
              </div>
            )}
          </div>
        );
      }
    },
    {
      id: 'key-features',
      title: 'Key Application Features',
      icon: Star,
      description: 'Essential functionality and capabilities',
      editLink: '/key-application-features',
      renderContent: () => {
        if (!formData.keyFeatures?.length) return null;
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Required Features</p>
            <div className="space-y-3">
              {formData.keyFeatures.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-gray-900">{feature}</span>
                  </div>
                  {getOptionDescription(feature) && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getOptionDescription(feature)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      id: 'hardware-requirements',
      title: 'Hardware & Peripheral Requirements',
      icon: Settings,
      description: 'Physical interfaces and hardware components',
      editLink: '/hardware-peripheral-requirements',
      renderContent: () => {
        if (!formData.hardwareRequirements?.length) return null;
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Hardware Components</p>
            <div className="space-y-3">
              {formData.hardwareRequirements.map((requirement, index) => (
                <div key={index} className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900 text-sm">{requirement}</span>
                  </div>
                  {getOptionDescription(requirement) && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getOptionDescription(requirement)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      id: 'middleware-frameworks',
      title: 'Middleware & Frameworks',
      icon: Code,
      description: 'Software frameworks and middleware components',
      editLink: '/middleware-frameworks',
      renderContent: () => {
        if (!formData.middlewareFrameworks?.length) return null;
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Selected Frameworks</p>
            <div className="space-y-3">
              {formData.middlewareFrameworks.map((framework, index) => (
                <div key={index} className="border rounded-lg p-4 bg-purple-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="px-3 py-1">
                      <Code className="w-3 h-3 mr-1" />
                      {framework}
                    </Badge>
                  </div>
                  {getOptionDescription(framework) && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getOptionDescription(framework)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      id: 'driver-needs',
      title: 'Driver Development Requirements',
      icon: Zap,
      description: 'Custom driver and low-level software needs',
      editLink: '/driver-development-needs',
      renderContent: () => {
        if (!formData.driverNeeds?.length) return null;
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Development Requirements</p>
            <div className="space-y-3">
              {formData.driverNeeds.map((need, index) => (
                <div key={index} className="border rounded-lg p-4 bg-orange-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-gray-900 text-sm">{need}</span>
                  </div>
                  {getOptionDescription(need) && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {getOptionDescription(need)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      id: 'cloud-connectivity',
      title: 'Cloud & Connectivity Strategy',
      icon: Cloud,
      description: 'Cloud integration and connectivity approach',
      editLink: '/cloud-connectivity-strategy',
      renderContent: () => {
        const hasCloudData = formData.cloudStrategy ||
          (formData.cloudPlatforms && formData.cloudPlatforms.length > 0) ||
          formData.iotIntegration ||
          (formData.dataProcessing && formData.dataProcessing.length > 0);
        if (!hasCloudData) return null;

        return (
          <div className="space-y-4">
            {formData.cloudStrategy && (
              <div className="border rounded-lg p-4 bg-indigo-50">
                <p className="text-sm text-gray-600 mb-2">Strategy</p>
                <Badge variant="secondary" className="px-3 py-1 mb-3">
                  <Cloud className="w-3 h-3 mr-1" />
                  {getDisplayLabel(formData.cloudStrategy)}
                </Badge>
                {getOptionDescription(formData.cloudStrategy) && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {getOptionDescription(formData.cloudStrategy)}
                  </p>
                )}
              </div>
            )}

            {formData.cloudPlatforms && formData.cloudPlatforms.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-3">Cloud Platforms</p>
                <div className="space-y-2">
                  {formData.cloudPlatforms.map((platform, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-blue-50">
                      <Badge variant="outline" className="px-2 py-1 text-xs">
                        {platform}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.iotIntegration && (
              <div className="border rounded-lg p-4 bg-green-50">
                <p className="text-sm text-gray-600 mb-2">IoT Integration</p>
                <Badge variant="outline" className="px-3 py-1 mb-3">
                  <Wifi className="w-3 h-3 mr-1" />
                  {getDisplayLabel(formData.iotIntegration)}
                </Badge>
                {getOptionDescription(formData.iotIntegration) && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {getOptionDescription(formData.iotIntegration)}
                  </p>
                )}
              </div>
            )}

            {formData.dataProcessing && formData.dataProcessing.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-3">Data Processing Requirements</p>
                <div className="space-y-2">
                  {formData.dataProcessing.map((processing, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-cyan-50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-sm font-medium text-gray-900">{processing}</span>
                      </div>
                      {getOptionDescription(processing) && (
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {getOptionDescription(processing)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
    }
  ].filter(section => {
    // Only show sections that have data
    const sectionData = section.renderContent();
    return sectionData !== null;
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Validate that we have minimum required data
      if (!formData.contactInfo || !formData.contactInfo.fullName || !formData.contactInfo.email) {
        alert('Please complete the contact information before submitting.');
        setIsSubmitting(false);
        return;
      }

      console.log('Submitting configuration data:', formData);

      // Submit configuration to backend API
      const response = await fetch('/api/configurations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}, Response: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${result.error || 'Failed to submit configuration'}`);
      }

      if (result.success) {
        markStepCompleted('review-submit');

        // Send email notifications
        try {
          const notificationData = {
            id: result.configurationId,
            contactInfo: formData.contactInfo || {},
            submittedAt: new Date().toISOString(),
            industry: formData.industryFocus || 'Not specified',
            platforms: formData.corePlatforms || [],
            features: formData.keyFeatures || []
          };

          await fetch('/api/notifications', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData)
          });
        } catch (emailError) {
          console.error('Email notification error:', emailError);
          // Don't fail the submission if emails fail
        }

        setIsSubmitted(true);

        // Store configuration ID for future reference
        localStorage.setItem('lastConfigurationId', result.configurationId);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to submit configuration: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    try {
      const { generateConfigurationPDF } = require('@/lib/pdf-generator');
      generateConfigurationPDF(formData);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const copyMarkdownToClipboard = async () => {
    try {
      const markdownContent = generateMarkdownContent();
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  const generateMarkdownContent = () => {
    let markdown = `# ${formData.title || 'Embedded System Configuration'}\n\n`;

    if (formData.description) {
      markdown += `> ${formData.description}\n\n`;
    }

    markdown += `## Table of Contents\n\n`;
    configurationSections.forEach((section, index) => {
      markdown += `${index + 1}. [${section.title}](#${section.id.replace(/\s+/g, '-').toLowerCase()})\n`;
    });
    markdown += '\n';

    // Add configuration sections
    configurationSections.forEach((section) => {
      markdown += `## ${section.title}\n\n`;
      markdown += `*${section.description}*\n\n`;

      if (section.id === 'configuration-details' && formData.title) {
        markdown += `**Project Title:** ${formData.title}\n\n`;
        if (formData.description) {
          markdown += `**Description:**\n> ${formData.description}\n\n`;
        }
      }

      if (section.id === 'contact-info' && formData.contactInfo) {
        markdown += `**Contact Information:**\n\n`;
        if (formData.contactInfo.fullName) markdown += `- **Name:** ${formData.contactInfo.fullName}\n`;
        if (formData.contactInfo.email) markdown += `- **Email:** ${formData.contactInfo.email}\n`;
        if (formData.contactInfo.companyName) markdown += `- **Company:** ${formData.contactInfo.companyName}\n`;
        if (formData.contactInfo.phoneNumber) markdown += `- **Phone:** ${formData.contactInfo.phoneNumber}\n`;
        if (formData.contactInfo.projectDescription) {
          markdown += `\n**Project Description:**\n> ${formData.contactInfo.projectDescription}\n`;
        }
        markdown += '\n';
      }

      if (section.id === 'industry-focus' && formData.industryFocus) {
        markdown += `**Primary Industry:** ${formData.industryFocus}\n\n`;
        if (formData.otherIndustry) {
          markdown += `**Specific Market Segment:** ${formData.otherIndustry}\n\n`;
        }
      }

      if (section.id === 'core-platforms' && formData.corePlatforms?.length) {
        markdown += `**Selected Platforms:**\n\n`;
        formData.corePlatforms.forEach((platform, index) => {
          markdown += `### ${index + 1}. ${platform}\n\n`;
          const description = getOptionDescription(platform);
          if (description) {
            markdown += `${description}\n\n`;
          }
        });
      }

      if (section.id === 'operating-system' && formData.operatingSystem) {
        markdown += `**Operating System:** ${formData.operatingSystem}\n\n`;
        const description = getOptionDescription(formData.operatingSystem);
        if (description) {
          markdown += `${description}\n\n`;
        }
      }

      if (section.id === 'key-features' && formData.keyFeatures?.length) {
        markdown += `**Required Features:**\n\n`;
        formData.keyFeatures.forEach((feature) => {
          markdown += `- **${feature}**\n`;
          const description = getOptionDescription(feature);
          if (description) {
            markdown += `  ${description}\n`;
          }
          markdown += '\n';
        });
      }

      if (section.id === 'hardware-requirements' && formData.hardwareRequirements?.length) {
        markdown += `**Hardware Components:**\n\n`;
        formData.hardwareRequirements.forEach((requirement) => {
          markdown += `- **${requirement}**\n`;
          const description = getOptionDescription(requirement);
          if (description) {
            markdown += `  ${description}\n`;
          }
          markdown += '\n';
        });
      }

      if (section.id === 'middleware-frameworks' && formData.middlewareFrameworks?.length) {
        markdown += `**Selected Frameworks:**\n\n`;
        formData.middlewareFrameworks.forEach((framework) => {
          markdown += `- **${framework}**\n`;
          const description = getOptionDescription(framework);
          if (description) {
            markdown += `  ${description}\n`;
          }
          markdown += '\n';
        });
      }

      if (section.id === 'driver-needs' && formData.driverNeeds?.length) {
        markdown += `**Development Requirements:**\n\n`;
        formData.driverNeeds.forEach((need) => {
          markdown += `- **${need}**\n`;
          const description = getOptionDescription(need);
          if (description) {
            markdown += `  ${description}\n`;
          }
          markdown += '\n';
        });
      }

      if (section.id === 'cloud-connectivity') {
        if (formData.cloudStrategy) {
          markdown += `**Strategy:** ${getDisplayLabel(formData.cloudStrategy)}\n\n`;
          const description = getOptionDescription(formData.cloudStrategy);
          if (description) {
            markdown += `${description}\n\n`;
          }
        }

        if (formData.cloudPlatforms && formData.cloudPlatforms.length > 0) {
          markdown += `**Cloud Platforms:**\n`;
          formData.cloudPlatforms.forEach((platform) => {
            markdown += `- ${platform}\n`;
          });
          markdown += '\n';
        }

        if (formData.iotIntegration) {
          markdown += `**IoT Integration:** ${getDisplayLabel(formData.iotIntegration)}\n\n`;
          const description = getOptionDescription(formData.iotIntegration);
          if (description) {
            markdown += `${description}\n\n`;
          }
        }

        if (formData.dataProcessing && formData.dataProcessing.length > 0) {
          markdown += `**Data Processing Requirements:**\n`;
          formData.dataProcessing.forEach((processing) => {
            markdown += `- **${processing}**\n`;
            const description = getOptionDescription(processing);
            if (description) {
              markdown += `  ${description}\n`;
            }
            markdown += '\n';
          });
        }
      }

      markdown += '---\n\n';
    });

    markdown += `*Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}*\n`;
    markdown += `*Configuration ready for engineering review*\n`;

    return markdown;
  };

  // Calculate completion stats
  const totalSections = 10; // Total number of configuration sections
  const completedSectionsCount = configurationSections.length;
  const completionPercentage = Math.round((completedSectionsCount / totalSections) * 100);

  if (isSubmitted) {
    return (
      <PageLayout
        title="Submission Successful!"
        description="Thank you for your configuration request. Our team will review your requirements and contact you soon."
        stepId="review-submit"
      >
        <div className="w-full text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your configuration has been successfully submitted! Our engineering team will review your requirements and contact you within 1-2 business days with personalized recommendations.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              We&apos;ve sent a confirmation email to your registered address with a copy of your configuration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={generatePDF} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF Summary
              </Button>
              <Link href="/">
                <Button variant="outline">
                  Start New Configuration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Review & Submit Configuration"
      description="Review your complete embedded system configuration and submit your requirements."
      stepId="review-submit"
    >
      <div className="w-full space-y-8">
        {/* Configuration Summary Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {formData.title || 'Embedded System Configuration'}
              </h2>
              <p className="text-gray-600">
                Complete system specification ready for engineering review
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {completionPercentage}%
              </div>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-gray-600">Created:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">Sections:</span>
              <span className="font-medium">{completedSectionsCount} of {totalSections}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-gray-600">Status:</span>
              <Badge variant="secondary">Ready for Review</Badge>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('markdown')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === 'markdown'
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              📄 Markdown View
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                viewMode === 'cards'
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              🗃️ Card View
            </button>
          </div>
        </div>

        {/* Markdown-Style Configuration Display */}
        {viewMode === 'markdown' && configurationSections.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Markdown Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-mono font-semibold text-gray-900">
                    Configuration.md
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    Generated {new Date().toLocaleDateString()}
                  </Badge>
                </div>
                <Button
                  onClick={copyMarkdownToClipboard}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Markdown
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Markdown Content */}
            <div className="p-6 font-mono text-sm leading-relaxed space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900 font-sans border-b-2 border-gray-200 pb-2">
                  # {formData.title || 'Embedded System Configuration'}
                </h1>
                {formData.description && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 pl-4 py-3 rounded-r">
                    <p className="text-gray-700 font-sans italic">
                      {formData.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-sans">
                  ## Table of Contents
                </h3>
                <div className="grid md:grid-cols-2 gap-2 text-blue-600">
                  {configurationSections.map((section, index) => (
                    <div key={section.id} className="flex items-center gap-2">
                      <span className="text-gray-500">{index + 1}.</span>
                      <Link href={`#${section.id}`} className="hover:underline">
                        {section.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration Sections */}
              {configurationSections.map((section, sectionIndex) => (
                <div key={section.id} id={section.id} className="space-y-4">
                  {/* Section Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 font-sans border-b border-gray-300 pb-2 flex items-center gap-3">
                      <span className="text-blue-600">##</span>
                      <section.icon className="w-6 h-6 text-blue-600" />
                      {section.title}
                    </h2>
                    <Link href={section.editLink}>
                      <Button variant="outline" size="sm" className="shrink-0">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>

                  {/* Section Description */}
                  <div className="text-gray-600 italic mb-4">
                    *{section.description}*
                  </div>

                  {/* Section Content in Markdown Style */}
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    {section.id === 'configuration-details' && formData.title && (
                      <div className="space-y-3">
                        <div className="font-semibold text-gray-900 text-lg font-sans">
                          **Project Title:** {formData.title}
                        </div>
                        {formData.description && (
                          <div className="space-y-2">
                            <div className="font-semibold text-gray-700">**Description:**</div>
                            <div className="bg-white p-3 rounded border-l-4 border-blue-400 font-sans">
                              {formData.description}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {section.id === 'contact-info' && formData.contactInfo && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 font-sans">**Contact Information**</h4>
                        <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded border">
                          {formData.contactInfo.fullName && (
                            <div className="space-y-1">
                              <div className="text-gray-600">👤 **Name:**</div>
                              <div className="font-sans">`{formData.contactInfo.fullName}`</div>
                            </div>
                          )}
                          {formData.contactInfo.email && (
                            <div className="space-y-1">
                              <div className="text-gray-600">📧 **Email:**</div>
                              <div className="font-sans">`{formData.contactInfo.email}`</div>
                            </div>
                          )}
                          {formData.contactInfo.companyName && (
                            <div className="space-y-1">
                              <div className="text-gray-600">🏢 **Company:**</div>
                              <div className="font-sans">`{formData.contactInfo.companyName}`</div>
                            </div>
                          )}
                          {formData.contactInfo.phoneNumber && (
                            <div className="space-y-1">
                              <div className="text-gray-600">📞 **Phone:**</div>
                              <div className="font-sans">`{formData.contactInfo.phoneNumber}`</div>
                            </div>
                          )}
                        </div>
                        {formData.contactInfo.projectDescription && (
                          <div className="space-y-2">
                            <div className="font-semibold text-gray-700">**Project Description:**</div>
                            <div className="bg-white p-3 rounded border-l-4 border-green-400 font-sans">
                              {formData.contactInfo.projectDescription}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {section.id === 'industry-focus' && formData.industryFocus && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="font-semibold text-gray-700">**Primary Industry:**</div>
                          <div className="bg-white px-3 py-2 rounded border font-sans">
                            🎯 {formData.industryFocus}
                          </div>
                        </div>
                        {formData.otherIndustry && (
                          <div className="space-y-2">
                            <div className="font-semibold text-gray-700">**Specific Market Segment:**</div>
                            <div className="bg-white p-3 rounded border-l-4 border-purple-400 font-sans">
                              {formData.otherIndustry}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {section.id === 'core-platforms' && formData.corePlatforms?.length && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 font-sans">**Selected Platforms:**</h4>
                        {formData.corePlatforms.map((platform, index) => (
                          <div key={index} className="bg-white rounded border-l-4 border-blue-500 p-4">
                            <div className="font-semibold text-blue-700 mb-2 font-sans">
                              ### {index + 1}. {platform}
                            </div>
                            {getOptionDescription(platform) && (
                              <div className="text-gray-700 text-sm font-sans leading-relaxed bg-blue-50 p-3 rounded">
                                {getOptionDescription(platform)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.id === 'operating-system' && formData.operatingSystem && (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded border-l-4 border-green-500">
                          <div className="font-semibold text-green-700 mb-2 font-sans">
                            💿 **Operating System:** {formData.operatingSystem}
                          </div>
                          {getOptionDescription(formData.operatingSystem) && (
                            <div className="text-gray-700 text-sm font-sans leading-relaxed bg-green-50 p-3 rounded mt-3">
                              {getOptionDescription(formData.operatingSystem)}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {section.id === 'key-features' && formData.keyFeatures?.length && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 font-sans">**Required Features:**</h4>
                        {formData.keyFeatures.map((feature, index) => (
                          <div key={index} className="bg-white rounded border-l-4 border-yellow-500 p-4">
                            <div className="font-semibold text-yellow-700 mb-2 font-sans flex items-center gap-2">
                              ⭐ {feature}
                            </div>
                            {getOptionDescription(feature) && (
                              <div className="text-gray-700 text-sm font-sans leading-relaxed bg-yellow-50 p-3 rounded">
                                {getOptionDescription(feature)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.id === 'hardware-requirements' && formData.hardwareRequirements?.length && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 font-sans">**Hardware Components:**</h4>
                        {formData.hardwareRequirements.map((requirement, index) => (
                          <div key={index} className="bg-white rounded border-l-4 border-green-500 p-4">
                            <div className="font-semibold text-green-700 mb-2 font-sans flex items-center gap-2">
                              🔧 {requirement}
                            </div>
                            {getOptionDescription(requirement) && (
                              <div className="text-gray-700 text-sm font-sans leading-relaxed bg-green-50 p-3 rounded">
                                {getOptionDescription(requirement)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.id === 'middleware-frameworks' && formData.middlewareFrameworks?.length && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 font-sans">**Selected Frameworks:**</h4>
                        {formData.middlewareFrameworks.map((framework, index) => (
                          <div key={index} className="bg-white rounded border-l-4 border-purple-500 p-4">
                            <div className="font-semibold text-purple-700 mb-2 font-sans flex items-center gap-2">
                              📦 {framework}
                            </div>
                            {getOptionDescription(framework) && (
                              <div className="text-gray-700 text-sm font-sans leading-relaxed bg-purple-50 p-3 rounded">
                                {getOptionDescription(framework)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.id === 'driver-needs' && formData.driverNeeds?.length && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 font-sans">**Development Requirements:**</h4>
                        {formData.driverNeeds.map((need, index) => (
                          <div key={index} className="bg-white rounded border-l-4 border-orange-500 p-4">
                            <div className="font-semibold text-orange-700 mb-2 font-sans flex items-center gap-2">
                              ⚡ {need}
                            </div>
                            {getOptionDescription(need) && (
                              <div className="text-gray-700 text-sm font-sans leading-relaxed bg-orange-50 p-3 rounded">
                                {getOptionDescription(need)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.id === 'cloud-connectivity' && (
                      <div className="space-y-4">
                        {formData.cloudStrategy && (
                          <div className="bg-white rounded border-l-4 border-indigo-500 p-4">
                            <div className="font-semibold text-indigo-700 mb-2 font-sans">
                              ☁️ **Strategy:** {getDisplayLabel(formData.cloudStrategy)}
                            </div>
                            {getOptionDescription(formData.cloudStrategy) && (
                              <div className="text-gray-700 text-sm font-sans leading-relaxed bg-indigo-50 p-3 rounded">
                                {getOptionDescription(formData.cloudStrategy)}
                              </div>
                            )}
                          </div>
                        )}

                        {formData.cloudPlatforms && formData.cloudPlatforms.length > 0 && (
                          <div className="space-y-2">
                            <div className="font-semibold text-gray-700">**Cloud Platforms:**</div>
                            <div className="bg-white p-3 rounded border">
                              {formData.cloudPlatforms.map((platform, index) => (
                                <div key={index} className="inline-block mr-2 mb-2">
                                  <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                    {platform}
                                  </code>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {formData.iotIntegration && (
                          <div className="bg-white rounded border-l-4 border-green-500 p-4">
                            <div className="font-semibold text-green-700 mb-2 font-sans">
                              📡 **IoT Integration:** {getDisplayLabel(formData.iotIntegration)}
                            </div>
                            {getOptionDescription(formData.iotIntegration) && (
                              <div className="text-gray-700 text-sm font-sans leading-relaxed bg-green-50 p-3 rounded">
                                {getOptionDescription(formData.iotIntegration)}
                              </div>
                            )}
                          </div>
                        )}

                        {formData.dataProcessing && formData.dataProcessing.length > 0 && (
                          <div className="space-y-2">
                            <div className="font-semibold text-gray-700">**Data Processing Requirements:**</div>
                            {formData.dataProcessing.map((processing, index) => (
                              <div key={index} className="bg-white rounded border-l-4 border-cyan-500 p-3">
                                <div className="font-semibold text-cyan-700 font-sans flex items-center gap-2">
                                  🔄 {processing}
                                </div>
                                {getOptionDescription(processing) && (
                                  <div className="text-gray-700 text-sm font-sans leading-relaxed bg-cyan-50 p-2 rounded mt-2">
                                    {getOptionDescription(processing)}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Add separator between sections */}
                  {sectionIndex < configurationSections.length - 1 && (
                    <div className="border-b border-gray-200 my-8"></div>
                  )}
                </div>
              ))}

              {/* Footer */}
              <div className="mt-12 pt-6 border-t-2 border-gray-300">
                <div className="text-center space-y-2">
                  <div className="text-gray-600 font-sans">
                    ---
                  </div>
                  <div className="text-sm text-gray-500 font-sans">
                    Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </div>
                  <div className="text-sm text-gray-500 font-sans">
                    Configuration ready for engineering review
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Original Card View */}
        {viewMode === 'cards' && configurationSections.length > 0 && (
          <div className="grid gap-6">
            {configurationSections.map((section) => (
              <Card key={section.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                <CardHeader className="bg-gray-50 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">
                          {section.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <Link href={section.editLink}>
                      <Button variant="outline" size="sm" className="shrink-0">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {section.renderContent()}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {configurationSections.length === 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>No configuration data found.</strong> Please complete the configuration steps before submitting.
              <div className="mt-2">
                <Link href="/configuration-details">
                  <Button variant="outline" size="sm">
                    Start Configuration
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* System Recommendations */}
        {configurationSections.length > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Shield className="w-5 h-5" />
                System Compatibility Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Estimated Specifications</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• Development Timeline: 12-16 weeks</li>
                    <li>• Complexity Level: {completionPercentage > 80 ? 'High' : completionPercentage > 60 ? 'Medium' : 'Standard'}</li>
                    <li>• Testing Requirements: Comprehensive</li>
                    <li>• Support Duration: 24 months minimum</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Recommended Next Steps</h4>
                  <ul className="space-y-1 text-green-700">
                    <li>• Requirements analysis meeting</li>
                    <li>• Detailed technical specification</li>
                    <li>• Prototype development plan</li>
                    <li>• Project timeline and milestones</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {configurationSections.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-4 justify-between pt-6 border-t border-gray-200">
            <Link href="/contact-information">
              <Button variant="outline" className="w-full lg:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contact Info
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={generatePDF}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Summary
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Configuration...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Configuration Request
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <Alert className="bg-blue-50 border-blue-200">
          <Clock className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="space-y-2">
              <div className="font-semibold">What happens next?</div>
              <div className="text-sm space-y-1">
                <p>✓ Our engineering team will review your configuration within 1-2 business days</p>
                <p>✓ You'll receive personalized recommendations and technical specifications</p>
                <p>✓ We'll provide detailed pricing, timeline, and implementation roadmap</p>
                <p>✓ A dedicated project manager will be assigned to guide your development</p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </PageLayout>
  );
};

export default ReviewSubmitPage;
