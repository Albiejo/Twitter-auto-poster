import mongoose from 'mongoose';


const tweetSchema = new mongoose.Schema({

    content : {type: String, required: true},
    scheduledDate : {type: Date, required: true},
    twitterAccountId:{type: Number}
} , {timestamps: true});


const Tweet = mongoose.models.Tweet || mongoose.model('Tweet', tweetSchema);

export default Tweet;


