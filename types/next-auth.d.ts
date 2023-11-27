import NextAuth, { DefaultSession } from "next-auth";

type CardsOwned = string[];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      cardsOwned: CardsOwned;
      desiredCards: CardsOwned;
      wishesPublicUrl?: string;
      doublesPublicUrl?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    cardsOwned: CardsOwned;
    desiredCards: CardsOwned;
    wishesPublicUrl?: string;
    doublesPublicUrl?: string;
  }
}
