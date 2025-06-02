import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactInformationPage = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Contact Information</h1>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Company Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your company email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Enter your company name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectDescription">Brief Project Description (Optional)</Label>
          <Textarea
            id="projectDescription"
            name="projectDescription"
            placeholder="Enter a brief description of your project"
          />
        </div>
        <Link href="/core-platform-selection" passHref> {/* Add Link component */}
          <Button type="submit" className="mt-8 w-full">
            Next
          </Button>
        </Link> {/* Close Link component */}
      </form>
    </div>
  );
};

export default ContactInformationPage;
