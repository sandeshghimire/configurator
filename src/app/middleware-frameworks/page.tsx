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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Middleware & Frameworks</h1>
      <form className="space-y-4">
        {frameworks.map((framework) => (
          <div key={framework} className="flex items-center space-x-2">
            <Checkbox id={framework.toLowerCase().replace(/[^a-z0-9]+/g, '-')} name="frameworks" value={framework} />
            <Label htmlFor={framework.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-normal">
              {framework}
            </Label>
          </div>
        ))}
        <Link href="/key-application-features" passHref> {/* Add Link component */}
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link> {/* Close Link component */}
      </form>
    </div>
  );
};

export default MiddlewareFrameworksPage;
