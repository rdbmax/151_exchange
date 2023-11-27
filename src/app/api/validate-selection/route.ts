import { authOptions } from "@Utils/authOptions";
import { getServerSession } from "next-auth";

import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  let session, cardsOwned, userUpdated, cardType;

  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.log("NO SESSION FOUND");
    return new Response("", { status: 401 });
  }

  try {
    ({ type: cardType, list: cardsOwned } = await request.json());
  } catch (e) {
    console.log("CANNOT RETREIVE DATA");
    return new Response("", { status: 400 });
  }

  if (session && cardsOwned && cardType) {
    try {
      const data = {
        [cardType === "wishes" ? "desiredCards" : "cardsOwned"]: cardsOwned,
      };

      userUpdated = await prisma.user.update({
        where: { id: session.user.id },
        data,
      });
    } catch (e) {
      console.log("CANNOT UPDATE USER");
      return new Response("", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
