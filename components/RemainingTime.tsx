"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface RemainingTimeProps {
  scheduledTime: string;
}

const RemainingTime: React.FC<RemainingTimeProps> = ({ scheduledTime }) => {
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date().getTime();
      const scheduledDate = new Date(scheduledTime).getTime();
      const timeDifference = scheduledDate - now;

      if (timeDifference <= 0) {
        setRemainingTime("Tweet is posting soon!");
        return false;
      }

      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setRemainingTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
      return true;
    };

    if (calculateRemainingTime()) {
      const interval = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(interval);
    }
  }, [scheduledTime]);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Time Remaining </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-center space-x-2 mb-2"></div>
        {remainingTime ? (
          <div
            className="text-3xl md:text-4xl text-center font-bold text-blue-600"
            aria-live="polite"
            aria-atomic="true"
          >
            {remainingTime}
          </div>
        ) : (
          <Skeleton className="h-10 w-full" />
        )}
      </CardContent>
    </Card>
  );
};

export default RemainingTime;
