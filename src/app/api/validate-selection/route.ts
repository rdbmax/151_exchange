import { authOptions } from "@Utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  let session, cardsOwned, userUpdated;

  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.log("NO SESSION FOUND");
    return new Response("", { status: 401 });
  }

  try {
    cardsOwned = await request.json();
  } catch (e) {
    console.log("NO CARDS IN BODY");
    return new Response("", { status: 400 });
  }

  if (session && cardsOwned) {
    try {
      userUpdated = await prisma.user.update({
        where: { id: session.user.id },
        data: { cardsOwned },
      });
    } catch (e) {
      console.log("CANNOT UPDATE USER");
      return new Response("", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
