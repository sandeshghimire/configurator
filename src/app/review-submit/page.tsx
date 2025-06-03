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
  Info
} from "lucide-react";
import PageLayout from "@/components/page-layout";
import { useConfigurator } from "@/components/configurator-context";

const ReviewSubmitPage = () => {
  const { formData, markStepCompleted } = useConfigurator();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

        {/* Configuration Details Grid */}
        {configurationSections.length > 0 ? (
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
        ) : (
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
