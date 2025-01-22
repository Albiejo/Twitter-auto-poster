import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialIcon } from 'react-social-icons'
import moment from 'moment';
interface NextTweetCardProps {
  tweet: string;
  scheduledtime: Date;
  onEdit: () => void;
}

const NextTweetCard = ({
  tweet,
  scheduledtime,
  onEdit,
}: NextTweetCardProps) => {
  const characterCount = tweet?.length;
  const maxCharacterCount = 280;
  const formattedDate = moment(scheduledtime).format('D');
  return (
    <Card className="w-full max-w-md mx-auto my-4">


      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Upcoming Tweet</CardTitle>
        <div className="flex items-center space-x-2">
        <SocialIcon url="https://twitter.com" style={{height:40 , width:40}} />
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Scheduled for: {formattedDate}
          </p>
          <p className="text-sm font-medium leading-none mt-2">{tweet}</p>
          <div className="flex justify-between items-center mt-4">
            <Badge variant={characterCount > maxCharacterCount ? "destructive" : "secondary"}>
              {characterCount}/{maxCharacterCount} characters
            </Badge>
            <p className="text-xs text-muted-foreground">
              {characterCount > maxCharacterCount ? "Tweet is too long!" : "Ready to post"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextTweetCard;
