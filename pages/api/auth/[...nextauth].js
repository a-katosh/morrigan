// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Set user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Set user ID in the session object
      return session;
    },
  },
});
