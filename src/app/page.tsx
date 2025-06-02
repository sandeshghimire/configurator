"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, Settings, Zap, Shield } from "lucide-react";
import PageLayout from "@/components/page-layout";

export default function Home() {
  const features = [
    {
      icon: Cpu,
      title: "Platform Selection",
      description: "Choose from industry-leading SOC platforms optimized for your use case"
    },
    {
      icon: Settings,
      title: "Custom Configuration",
      description: "Tailored recommendations based on your specific requirements"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Get insights on power consumption, processing speed, and efficiency"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "Ensure your solution meets industry standards and regulations"
    }
  ];

  return (
    <PageLayout
      title="Welcome to the SOC Product Configurator"
      description="Answer a few questions to help us understand your project requirements and generate a tailored embedded system configuration."
      stepId="home"
    >
      <div className="space-y-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Configure Your Embedded System?
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Our intelligent configurator will guide you through selecting the optimal components
              for your embedded system project, from hardware platforms to software frameworks.
            </p>
            <Link href="/industry-focus" passHref>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Start Configuration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="text-sm text-gray-500">
            <p>🔒 Your configuration data is automatically saved and can be resumed at any time</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
