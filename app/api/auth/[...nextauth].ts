import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";



export default NextAuth({
    providers: [
        Twitter({
            clientId:process.env.TWITTER_API_KEY!,
            clientSecret:process.env.TWITTER_API_KEY_SECRET!,
        })
    ],

    callbacks: {
        async jwt({ token, user, account, profile, isNewUser  }: any) {
          // You can add custom logic here to handle the user's Twitter profile
          return token;
        },
        async session({ session, token }: any) {
          // You can add custom logic here to handle the user's session
          return session;
        },
      },

})