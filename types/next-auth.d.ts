import NextAuth, { DefaultSession } from "next-auth";

type CardsOwned = string[];

declare module "next-auth" {
  interface Session {
    user: {
      cardsOwned: CardsOwned;
      id: string;
      doubles_public_url: string;
    } & DefaultSession["user"];
  }

  interface User {
    cardsOwned: CardsOwned;
    doubles_public_url: string;
    id: string;
  }
}
