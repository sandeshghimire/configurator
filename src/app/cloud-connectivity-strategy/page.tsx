import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CloudConnectivityStrategyPage = () => {
  const cloudPlatforms = [
    { id: "aws", label: "AWS" },
    { id: "azure", label: "Azure" },
    { id: "gcp", label: "GCP" },
    { id: "private-cloud", label: "Private Cloud" },
    { id: "on-premise-only", label: "On-Premise Only" },
    { id: "undecided-cloud", label: "Undecided" },
  ];

  const dataProcessingNeeds = [
    { id: "edge-ai", label: "Edge AI Processing" },
    { id: "cloud-ai-ml", label: "Cloud-based AI/ML" },
    { id: "real-time-streaming", label: "Real-time Data Streaming" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          <h1 className="text-xl font-bold text-center">Cloud & Connectivity Strategy</h1>
          <form className="space-y-6">
            <div>
              <Label className="text-base font-medium">Cloud Platform</Label>
              <div className="space-y-2 mt-2">
                {cloudPlatforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox id={platform.id} value={platform.label} />
                    <Label htmlFor={platform.id} className="font-normal text-sm">{platform.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">IoT Platform Integration</Label>
              <RadioGroup defaultValue="undecided-iot" className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes-iot" id="yes-iot" />
                  <Label htmlFor="yes-iot" className="font-normal text-sm">Yes (e.g., Device Management, Fleet Management)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-iot" id="no-iot" />
                  <Label htmlFor="no-iot" className="font-normal text-sm">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="undecided-iot" id="undecided-iot" />
                  <Label htmlFor="undecided-iot" className="font-normal text-sm">Undecided</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">Data Processing Needs</Label>
              <div className="space-y-2 mt-2">
                {dataProcessingNeeds.map((need) => (
                  <div key={need.id} className="flex items-center space-x-2">
                    <Checkbox id={need.id} value={need.label} />
                    <Label htmlFor={need.id} className="font-normal text-sm">{need.label}</Label>
                  </div>
                ))}
              </div>
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
