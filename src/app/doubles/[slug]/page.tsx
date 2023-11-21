import { all_cards_flat } from "@DB/all_cards";

import prisma from "../../../../lib/prisma";

import CardsWrapper from "./CardsWrapper";
import styles from "./doublePage.module.css";

type DoublePageProps = {
  params: { slug: string };
};

export default async function DoublePage({
  params: { slug },
}: DoublePageProps) {
  const user = await prisma.user.findUnique({
    where: {
      doublesPublicUrl: slug,
    },
    select: {
      cardsOwned: true,
    },
  });

  return user.cardsOwned ? (
    <>
      <p className={styles.introduction}>
        Un utilisateur vous met à disposition sa liste de carte en double,
        profitez en pour lui proposer des échanges !
      </p>
      <CardsWrapper userCards={user.cardsOwned} allCards={all_cards_flat} />
    </>
  ) : (
    <p>404</p>
  );
}
