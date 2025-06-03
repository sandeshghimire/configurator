"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cpu, Settings, Zap, Shield, Sparkles } from "lucide-react";
import PageLayout from "@/components/page-layout";
import {
  AnimatedButton,
  AnimatedCard,
  AnimatedContainer,
  FadeIn,
  SlideUp,
  ScaleIn,
  HoverScale
} from "@/components/animated";

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

  return (
    <PageLayout
      title=""
      description=""
      stepId="home"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <FadeIn className="text-center space-y-4">
          <div className="space-y-3">
            <ScaleIn delay={0.1}>
              <div className="inline-flex items-center px-2 py-1 bg-blue-50 rounded-full text-xs font-medium text-blue-600 mb-1">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Configuration
              </div>
            </ScaleIn>
            <SlideUp delay={0.2}>
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl xl:text-4xl">
                SOC Product
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Configurator
                </span>
              </h1>
            </SlideUp>
            <FadeIn delay={0.4}>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-5">
                Answer a few questions to help us understand your project requirements and generate
                a tailored embedded system configuration with expert recommendations.
              </p>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <div className="space-y-4">
          <SlideUp delay={0.5} className="text-center space-y-2">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Why Choose Our Configurator?
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-5">
              Built by embedded systems experts to simplify your development process
            </p>
          </SlideUp>

          <AnimatedContainer
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            staggerDelay={0.1}
          >
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={0.6 + index * 0.1} enableHover={true}>
                <Card className="border hover:border-muted-foreground/50 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="space-y-1">
                      <h3 className="scroll-m-20 text-base font-semibold tracking-tight">{feature.title}</h3>
                      <p className="text-muted-foreground text-xs leading-5">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </AnimatedContainer>
        </div>

        {/* Enhanced Call to Action */}
        <SlideUp delay={1.0}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-5"></div>
            <div className="relative bg-background border rounded-xl p-6 text-center space-y-4">
              <div className="space-y-2">
                <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Ready to Configure Your Embedded System?
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-5">
                  Our intelligent configurator will guide you through selecting the optimal components
                  for your embedded system project, from hardware platforms to software frameworks.
                </p>
              </div>

              <div className="space-y-3">
                <HoverScale scale={1.05}>
                  <Link href="/configuration-details" passHref>
                    <AnimatedButton asChild>
                      <Button size="default" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        Start Configuration
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </AnimatedButton>
                  </Link>
                </HoverScale>

                <FadeIn delay={1.2}>
                  <div className="flex items-center justify-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Auto-save progress</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Free to use</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">Expert validated</span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </SlideUp>

        {/* Trust Indicators */}
        <FadeIn delay={1.3} className="text-center space-y-1 py-3 border-t">
          <p className="text-xs font-medium">Trusted by embedded systems engineers worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium">🏭 Industrial IoT</span>
            <span className="font-medium">🚗 Automotive</span>
            <span className="font-medium">🏥 Medical Devices</span>
            <span className="font-medium">✈️ Aerospace</span>
            <span className="font-medium">🏠 Consumer Electronics</span>
          </div>
        </FadeIn>
      </div>
    </PageLayout>
  );
}
