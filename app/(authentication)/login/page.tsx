"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SocialIcon } from "react-social-icons";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(email, password);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Blue background with logo */}
      <div className="hidden md:flex md:w-1/2 bg-[#1DA1F2] items-center justify-center">
        <div className="p-8 text-center">
          <div className=" rounded-full p-8 inline-block shadow-lg">
            {/* <SocialIcon className="h-32 w-32 text-[#1DA1F2]" /> */}
            <SocialIcon
              url="https://twitter.com"
              style={{ height: 60, width: 60 }}
            />
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
     
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign in using X
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Twitter X Logo */}
            <div className="flex justify-center">
              <SocialIcon
                url="https://twitter.com"
                style={{ height: 60, width: 60 }}
              />
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Phone, email, or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-[#1DA1F2] focus:ring-[#1DA1F2]"
                required
              />

              <Input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[#1DA1F2] focus:ring-[#1DA1F2]"
                required
              />

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white"
              >
                Submit
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="https://x.com/" className="text-[#1DA1F2] hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

    </div>
  );
};

export default LoginPage;
