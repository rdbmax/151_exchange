import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const getPrismaClient = () => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient().$extends(withAccelerate());
  } else { // @ts-ignore
    if (!global.prisma) { // @ts-ignore
      global.prisma = new PrismaClient().$extends(withAccelerate());
    } // @ts-ignore
    return global.prisma
  }
}

const prisma = getPrismaClient()

export default prisma
