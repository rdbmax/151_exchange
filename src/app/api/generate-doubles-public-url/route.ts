import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { getServerSession } from "next-auth";

import { authOptions } from "@Utils/authOptions";

import prisma from "../../../../lib/prisma";

export async function GET() {
  let session, userUpdated;

  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.log("NO SESSION FOUND");
    return new Response("", { status: 401 });
  }

  const randomNameForURL = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });

  if (session && randomNameForURL) {
    try {
      userUpdated = await prisma.user.update({
        where: { id: session.user.id },
        data: { doubles_public_url: randomNameForURL },
      });
    } catch (e) {
      console.log("CANNOT UPDATE USER");
      return new Response("", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
