import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const MiddlewareFrameworksPage = () => {
  const frameworks = [
    'gRPC',
    'DDS (Data Distribution Service)',
    'ROS (Robot Operating System) / ROS 2',
    'MQTT',
    'OPC UA',
    'AI Frameworks (e.g., TensorFlow Lite, PyTorch Mobile, OpenVINO)',
    'Custom APIs / SDK',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-xl font-bold text-center">Select Middleware & Frameworks</h1>
          <form className="space-y-4">
            {frameworks.map((framework) => (
              <div key={framework} className="flex items-center space-x-2">
                <Checkbox id={framework.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="frameworks" value={framework} />
                <Label htmlFor={framework.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal text-sm">
                  {framework}
                </Label>
              </div>
            ))}
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
