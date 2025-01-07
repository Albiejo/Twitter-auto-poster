import React from "react";

interface TweetDisplayProps {
  content: string;
}

const TweetDisplay = ({content}:TweetDisplayProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-800">{content}</p>
    </div>
  );
};

export default TweetDisplay;
