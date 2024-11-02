import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "identify",
        },
      },
    }),
  ],
  pages: {
    signIn: '/signin', // Custom sign-in page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to the dashboard after sign-in
      return baseUrl + "/dashboard"; // Modify this if you want different redirect logic
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Optional: define a secret
});
