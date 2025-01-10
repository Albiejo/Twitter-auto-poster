"use client";

import { useState, useEffect } from "react";

//after singining in compoenents
import CountDownDisplay from "@/components/CountDownDisplay";
import NextTweetCard from "@/components/NextTweetCard";
import DateCircle from "@/components/DateCircle";
import TweetModal from "@/components/TweetModal";
import TweetForm from "@/components/TweetForm";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SocialIcon } from "react-social-icons";

interface tweet {
  id: number;
  content: string;
  ScheduledDate: Date;
}

const tweetArray = [
  {
    id: 1,
    content: "This is the next tweet to be posted! #NextJSRocks",
    ScheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
  },
  {
    id: 2,
    content: "Tweet scheduled for tomorrow. Excited about the new features! 🚀",
    ScheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
  {
    id: 3,
    content:
      "Two days from now, we'll be launching something big. Stay tuned! 👀",
    ScheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 48),
  },
  {
    id: 4,
    content:
      "In three days, we'll be hosting a live Q&A session. Don't miss out!",
    ScheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 72),
  },
];

const Home = () => {
  const [scheduledTweets, setScheduledTweets] = useState<tweet[]>(tweetArray);
  const [selectedTweet, setSelectedTweet] = useState<tweet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTweet, setEditingTweet] = useState<tweet | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-400" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            {/* <Twitter className="h-16 w-16 text-blue-500" /> */}
            <SocialIcon
              url="https://twitter.com"
              style={{ height: 60, width: 60 }}
            />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Auto Tweet</h1>
          <p className="text-gray-600">
            Schedule and automate your tweets with ease. Sign in with Twitter to
            get started.
          </p>
          <Button
            onClick={() => signIn()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
          >
            Sign in with Twitter
          </Button>
        </div>
      </div>
    );
  }

  //for creating a new tweet
  const handleCreateTweet = (newtweet: {
    content: string;
    ScheduledDate: Date;
  }) => {
    setScheduledTweets(
      [...scheduledTweets, { id: Date.now(), ...newtweet }].sort(
        (a, b) => a.ScheduledDate.getTime() - b.ScheduledDate.getTime()
      )
    );
  };

  //for updating a existing tweet
  const handleUpdateTweet = (updateTweet: {
    content: string;
    ScheduledDate: Date;
  }) => {
    if (editingTweet) {
      setScheduledTweets(
        scheduledTweets
          .map((tweet) =>
            tweet.id === editingTweet.id ? { ...tweet, ...updateTweet } : tweet
          )
          .sort((a, b) => a.ScheduledDate.getTime() - b.ScheduledDate.getTime())
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Twitter Auto Post</h1>

      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome ! signed in as {session?.user?.name}
      </h1>

      <div className="items-center justify-center  w-full h-full  flex mt-20">
        <Button
          onClick={() => signOut()}
          className="text-center justify-center"
        >
          Signout
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Time until next tweet:</h2>
        <CountDownDisplay targetDate={scheduledTweets[0].ScheduledDate} />
      </div>

      <div className="mb-8">
        <NextTweetCard
          tweet={scheduledTweets[0].content}
          scheduledtime={scheduledTweets[0].ScheduledDate}
          onEdit={() => {
            setEditingTweet(scheduledTweets[0]);
            setIsFormOpen(true);
          }}
        />
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming tweets:</h2>
          <Button onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Tweet
          </Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {scheduledTweets.map((tweet) => (
            <DateCircle
              key={tweet.id}
              date={tweet.ScheduledDate}
              onClick={() => setSelectedTweet(tweet)}
            />
          ))}
        </div>
      </div>

      {selectedTweet && (
        <TweetModal
          isOpen={!!selectedTweet}
          onClose={() => setSelectedTweet(null)}
          date={selectedTweet.ScheduledDate}
          content={selectedTweet.content}
        />
      )}

      <TweetForm
        isOpened={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTweet(null);
        }}
        onSubmit={editingTweet ? handleUpdateTweet : handleCreateTweet}
        initialTweet={editingTweet || undefined}
      />
    </div>
  );
};

export default Home;
