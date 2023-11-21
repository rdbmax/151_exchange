import NextAuth, { DefaultSession } from "next-auth";

type CardsOwned = string[];

declare module "next-auth" {
  interface Session {
    user: {
      cardsOwned: CardsOwned;
      id: string;
      desiredCards: string;
      wishesPublicUrl?: string;
      doublesPublicUrl?: string;
    } & DefaultSession["user"];
  }

  interface User {
    cardsOwned: CardsOwned;
    desiredCards: string;
    wishesPublicUrl?: string;
    doublesPublicUrl?: string;
    id: string;
  }
}
