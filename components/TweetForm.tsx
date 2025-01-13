"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import moment from "moment";

interface TweetFormProps {
  isOpened: boolean;
  onClose: () => void;
  onSubmit: (tweet: { content: string; ScheduledDate: Date }) => void;
  initialTweet?: { content: string; ScheduledDate: Date } | undefined;
}

const TweetForm = ({
  isOpened,
  onClose,
  onSubmit,
  initialTweet,
}: TweetFormProps) => {
  const [content, setContent] = useState(initialTweet?.content || "");
  const [scheduleddate, setScheduleddate] = useState(
    initialTweet?.ScheduledDate || new Date()
  );
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

  
  useEffect(() => {
    if (initialTweet) {
      setContent(initialTweet.content);
      setScheduleddate(initialTweet.ScheduledDate);
    } else {
      setContent("");
      setScheduleddate(new Date());
    }
  }, [initialTweet, isOpened]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ content, ScheduledDate: scheduleddate });
    onClose();
  };

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialTweet ? "Edit Tweet" : "Create New Tweet"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tweetContent">Tweet Content</Label>
              <Textarea
                id="tweetContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                className="resize-none"
                rows={4}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="scheduleddate">Scheduled Date and Time</Label>
              <Input
                id="scheduleddate"
                onChange={(e) =>
                  setScheduleddate(moment(e.target.value).toDate())
                }
                value={scheduleddate.toISOString().slice(0, 16)}
                type="datetime-local"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              {initialTweet ? "Update" : "Schedule"} Tweet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TweetForm;
