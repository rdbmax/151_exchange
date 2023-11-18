import NextAuth, { DefaultSession } from "next-auth";

type CardsOwned = string[];

declare module "next-auth" {
  interface Session {
    user: {
      cardsOwned: CardsOwned;
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    cardsOwned: CardsOwned;
    id: string;
  }
}
