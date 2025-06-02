import React from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactInformationPage = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg space-y-6">
          <h1 className="text-xl font-bold text-center">Contact Information</h1>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Provide your contact details so our engineering team can reach out with personalized recommendations and discuss your project requirements.
                All information is confidential and will only be used to assist with your embedded system configuration.
              </p>
            </CardContent>
          </Card>

          <form className="space-y-4">
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
                className="h-20"
              />
            </div>
            <Link href="/review-submit" passHref>
              <Button type="submit" className="w-full">
                Review & Submit
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationPage;
