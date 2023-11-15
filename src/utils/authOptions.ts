import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

import prisma from "../../lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // ** 1 days
  },

  // callbacks: {
  //   async session({ session, token }) {
  //     if (session.user) {
  //       // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
  //       // token.cardsOwned = user.cardsOwned;
  //     }

  //     return session;
  //   },
  // },
};
