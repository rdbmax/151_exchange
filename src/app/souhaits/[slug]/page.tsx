import { notFound } from "next/navigation";

import { all_cards_flat } from "@DB/all_cards";

import prisma from "../../../../lib/prisma";
import CardsWrapper from "./CardsWrapper";
import styles from "./wishesPage.module.css";

type WhishesPageProps = {
  params: { slug: string };
};

// https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#static-site-generation-getstaticprops

// OK when not so much users with wishes
// but with a lot, need to only generate when user update wishes list and uncomment next line
// export const dynamicParams = false;

export async function generateStaticParams() {
  const wishesSlugs = await prisma.user.findMany({
    where: {
      wishesPublicUrl: {
        not: null,
      },
    },
    select: {
      wishesPublicUrl: true,
    },
  });

  return wishesSlugs.map(({ wishesPublicUrl }) => ({
    slug: wishesPublicUrl,
  }));
}

export default async function WhishesPage({
  params: { slug },
}: WhishesPageProps) {
  const user = await prisma.user.findUnique({
    where: {
      wishesPublicUrl: slug,
    },
    select: {
      desiredCards: true,
    },
  });

  if (!user) {
    return notFound();
  }

  return user.desiredCards.length > 0 ? (
    <>
      <p className={styles.introduction}>
        Un utilisateur vous met à disposition la liste de cartes qu&apos;il
        souhaite acquérir, profitez en pour lui proposer des échanges !
      </p>
      <CardsWrapper userCards={user.desiredCards} allCards={all_cards_flat} />
    </>
  ) : (
    <p>
      Oups l&apos;utilisateur n&apos;a pas encore renseigné de cartes qu&apos;il
      souhaite acquérir.
    </p>
  );
}
