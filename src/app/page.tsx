"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, Settings, Zap, Shield, Sparkles, CheckCircle } from "lucide-react";
import PageLayout from "@/components/page-layout";

export default function Home() {
  const features = [
    {
      icon: Cpu,
      title: "Platform Selection",
      description: "Choose from industry-leading SOC platforms optimized for your use case",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Settings,
      title: "Custom Configuration",
      description: "Tailored recommendations based on your specific requirements",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Get insights on power consumption, processing speed, and efficiency",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "Ensure your solution meets industry standards and regulations",
      color: "bg-green-100 text-green-600"
    }
  ];

  const benefits = [
    "Save weeks of research and planning time",
    "Expert-validated component recommendations",
    "Cost-optimized solutions for your budget",
    "Future-proof architecture suggestions"
  ];

  return (
    <PageLayout
      title=""
      description=""
      stepId="home"
    >
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-600 mb-3">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Configuration
            </div>
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl xl:text-5xl">
              SOC Product
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Configurator
              </span>
            </h1>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-6">
              Answer a few questions to help us understand your project requirements and generate
              a tailored embedded system configuration with expert recommendations.
            </p>
          </div>

          {/* Quick Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Why Choose Our Configurator?
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-6">
              Built by embedded systems experts to simplify your development process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border hover:border-muted-foreground/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className={`inline-flex w-16 h-16 ${feature.color} rounded-xl items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-6">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5"></div>
          <div className="relative bg-background border rounded-2xl p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Ready to Configure Your Embedded System?
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-6">
                Our intelligent configurator will guide you through selecting the optimal components
                for your embedded system project, from hardware platforms to software frameworks.
              </p>
            </div>

            <div className="space-y-6">
              <Link href="/industry-focus" passHref>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Configuration
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Auto-save progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Free to use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Expert validated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-3 py-6 border-t">
          <p className="text-xs font-medium">Trusted by embedded systems engineers worldwide</p>
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <span className="font-medium">🏭 Industrial IoT</span>
            <span className="font-medium">🚗 Automotive</span>
            <span className="font-medium">🏥 Medical Devices</span>
            <span className="font-medium">✈️ Aerospace</span>
            <span className="font-medium">🏠 Consumer Electronics</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
