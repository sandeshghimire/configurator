"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button"; // Import Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components

const ReviewSubmitPage = () => {
  // Placeholder for collected data - updated with sample data for UI demonstration
  const [formData, setFormData] = useState({
    "Industry Focus": "Automotive",
    "Key Application Features": ["Real-time object detection", "Sensor fusion"],
    "Core Platform Selection": "NVIDIA Jetson AGX Orin",
    "Operating System Choice": "Ubuntu Server with ROS2",
    "Middleware & Frameworks": ["ROS2", "CUDA", "TensorRT"],
    "Driver Development Needs": "Custom camera and LiDAR drivers",
    "Hardware Peripheral Requirements": ["GMSL Cameras", "LiDAR", "IMU"],
    "Cloud Connectivity Strategy": "Hybrid (Edge processing with cloud sync for model updates)",
  });

  const handleSubmit = () => {
    // TODO: Implement logic to compile and send email to info@soccentric.com
    // This will require a backend API endpoint.
    alert('Thank you for your inquiry! Our team will review your requirements and contact you within 1-2 business days.');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Review & Submit</h1>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Summary of Your Selections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(formData).length > 0 ? (
              Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex flex-col p-3 border bg-slate-50 rounded-md shadow-sm">
                  <span className="text-md font-semibold text-gray-700">{key}</span>
                  <span className="text-sm text-gray-600 mt-1">
                    {Array.isArray(value)
                      ? value.join(', ')
                      : typeof value === 'object' && value !== null
                      ? JSON.stringify(value, null, 2) 
                      : String(value)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No selections available to display. Please go back and make your choices.</p>
            )}
          </CardContent>
        </Card>
        <p className="mt-4 text-xs text-gray-500 text-center">Note: The selections displayed are sample data. Actual data collection will be implemented.</p>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" asChild>
          <Link href="/industry-focus">Edit Selections</Link>
        </Button>
        <Button onClick={handleSubmit}>
          Submit Inquiry
        </Button>
      </div>
    </div>
  );
};

export default ReviewSubmitPage;
