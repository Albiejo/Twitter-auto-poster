import Tweet from "@/app/lib/modal/tweet";
import connect from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Types } from "mongoose";



export const GET = async () => {
    try {
        await connect();
        const tweets = {
            "tweets": [
                {
                    "id": "1",
                    "name": "John Doe",
                    "tweet": "This is a tweet"
                }]
        }
        //const tweets = await Tweet.find();
        return new NextResponse(JSON.stringify(tweets), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error in fetching tweets" + error.message, { status: 500 });
    }
}


export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newTweet = new Tweet(body);
        await newTweet.save();

        return new NextResponse(JSON.stringify({ message: "New tweet created", data: newTweet }), { status: 201 });
    } catch (error: any) {
        return new NextResponse("Error in creating tweet" + error.message, { status: 500 });
    }
}



export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { tweetId, newcontent, newDate } = body;

        await connect();

        if (!tweetId || !newcontent || !newDate) {
            return new NextResponse(JSON.stringify({ message: "tweetId or newContent or newDate is not found ." }), { status: 400 });
        }


        if (!Types.ObjectId.isValid(tweetId)) {
            return new NextResponse(JSON.stringify({ message: "tweetId is not valid" }), { status: 400 });
        }

        const updatdedTweet = await Tweet.findByIdAndUpdate({ _id: tweetId }, { content: newcontent, scheduledDate: newDate }, { new: true });

        if (!updatdedTweet) {
            return new NextResponse(JSON.stringify({ message: "tweet not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "tweet updated", data: updatdedTweet }), { status: 200 });

    } catch (error: any) {
        console.log("error in updating tweet :", error.message)
        return new NextResponse("Error in updating tweet" + error.message, { status: 500 });
    }
}


export const DELETE = async (request: Request) => {

    try {
        const body = await request.json();
        const { tweetId } = body;

        await connect();

        if(!tweetId){
            return new NextResponse(JSON.stringify({ message: "tweetId is not found ." }), { status: 400 });
        }


        if (!Types.ObjectId.isValid(tweetId)) {
            return new NextResponse(JSON.stringify({ message: "tweetId is not valid" }), { status: 400 });
        }


        const deletedTweet = await Tweet.findByIdAndDelete({ _id: tweetId });

        if (!deletedTweet) {
            return new NextResponse(JSON.stringify({ message: "tweet not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: "tweet deleted", data: deletedTweet }), { status: 200 });

    } catch (error) {
        
    }
}