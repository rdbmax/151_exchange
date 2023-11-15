import { all_cards_flat } from "@DB/all_cards";
import Cards from "@Components/Cards/Cards";
import Header from "@Components/Header/Header"

import prisma from "../../lib/prisma";

import styles from "./page.module.css";

export default async function Home() {
  if (process.env.NODE_ENV === "development") {
    const users = await prisma.user.findMany();
    console.log({ users });
  }

  return [
    <Header key="header" />,
    <main key="main" className={styles.main}>
      <Cards allCards={all_cards_flat} />
    </main>,
  ];
}
