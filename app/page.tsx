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
import { Navbar } from "@/components/Navbar"; 
import axios from "axios";


interface tweet {
  id: number;
  content: string;
  ScheduledDate: Date;
}



const Home = () => {

  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

  const [scheduledTweets, setScheduledTweets] = useState<tweet[]>([]);
  const [selectedTweet, setSelectedTweet] = useState<tweet | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingTweet, setEditingTweet] = useState<tweet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASEURL}/tweets`);
        if(response.status === 200){
          const data = response.data;
          setScheduledTweets(data);
          setIsLoading(false);
        }else{
          console.error('Error fetching tweets:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }

    fetchTweets();

  },[])


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
  const handleCreateTweet = async (newtweet: { content: string ,  ScheduledDate: Date }) => {
   try {
     setIsLoading(true);
    const response = await axios.post(`${BASEURL}/tweets`, newtweet);
    if(response.status === 201){
      const data = response.data;
      setScheduledTweets([...scheduledTweets, data]);
      setIsLoading(false);
    }else{
      console.error('Error creating tweet:', response.statusText); 
    }
   } catch (error) {
    console.error('Error creating tweet:', error);
   }
  };

  //for updating a existing tweet
  const handleUpdateTweet = async (updateTweet: {
    content: string;
    ScheduledDate: Date;
    id: string;
  }) => {
   try {
    setIsLoading(true);
    
    const TweetId = updateTweet.id;
    const newcontent = updateTweet.content;
    const newDate = updateTweet.ScheduledDate;


    const response = await axios.patch(`${BASEURL}/tweets}`, {tweetId: TweetId, newcontent: newcontent, newDate: newDate});

    if(response.status === 200){
      const data = response.data;
      setScheduledTweets(scheduledTweets.map((tweet)=> tweet.id === editingTweet?.id ? {...tweet , ...data} : tweet))
      setIsLoading(false);
    }else{
      console.error('Error updating tweet:', response.statusText);
    }
   } catch (error) {
    console.error('Error updating tweet:', error);
   }
  };

  return (
    <>
    {/* navbar will only be visible after signing in */}
    {session ? <Navbar/> : null}

    <div className="container mx-auto px-4 py-8">
    
      <h1 className="text-xl font-bold mb-8 text-right">
        Signed in as {session?.user?.name}
      </h1>


      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Time until next tweet:</h2>
        <CountDownDisplay targetDate={scheduledTweets[0]?.ScheduledDate} />
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
    </>
  );
};

export default Home;
