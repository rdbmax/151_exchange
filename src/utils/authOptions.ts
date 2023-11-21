import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

import prisma from "../../lib/prisma";

export const authOptions: NextAuthOptions = {
  // @ts-ignore because of the /types/next-auth.d.ts
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,

  session: {
    strategy: "database",
    maxAge: 1 * 24 * 60 * 60, // ** 1 days
  },
  // CHECK HOBBY PLAN FN EXECUTION
  // MAYBE INCREASING MAX_AGE WILL DECREASE VERCEL FN USAGE

  callbacks: {
    // async jwt({ token, account, profile }) {
    //   // Persist the OAuth access_token and or the user id to the token right after signin
    //   if (account) {
    //     token.cardOwned = account.userId
    //     token.id = profile.id
    //   }
    //   return token
    // },
    async session({ session, user }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user.cardsOwned = user.cardsOwned;
        session.user.doublesPublicUrl = user.doublesPublicUrl;
        session.user.desiredCards = user.desiredCards;
        session.user.wishesPublicUrl = user.wishesPublicUrl;
        session.user.id = user.id;
      }

      return await session;
    },
  },
};
