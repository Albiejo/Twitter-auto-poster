import NextAuth from "next-auth";
import TwitterProvider  from "next-auth/providers/twitter";



export default NextAuth({
    providers: [
      TwitterProvider ({
            clientId:process.env.TWITTER_API_KEY!,
            clientSecret:process.env.TWITTER_API_KEY_SECRET!,
        })
    ]

})

