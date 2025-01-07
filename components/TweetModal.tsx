import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TweetModalProps {
  date: Date;
  content: string;
  onClose: () => void;
  isOpen: boolean;
}

const TweetModal = ({ date, content, isOpen, onClose }: TweetModalProps) => {
  return(
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>Scheduled Tweet</DialogHeader>
      <div className="mt-4">
        <p className="font-semibold">Scheduled for: {date.toLocaleString()}</p>
        <p className="mt-2">{content}</p>
      </div>
    </DialogContent>
  </Dialog>)
};

export default TweetModal;
