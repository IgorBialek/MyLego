import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

//Next-auth configuration
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "guest",
      name: "Guest",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const user = {
          email: process.env.GUEST_EMAIL,
          name: "Guest",
        };
        return user;
      },
    }),
    // ...add more providers here
  ],
  pages: { signIn: "/auth/signIn" },
});
