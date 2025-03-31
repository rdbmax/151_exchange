import { notFound } from "next/navigation";
import { Suspense } from "react";

import { all_cards_flat } from "@DB/all_cards";

import prisma from "../../../../lib/prisma";
import CardsWrapper from "./CardsWrapper";
import styles from "./doublePage.module.css";

type DoublePageProps = {
  params: Promise<{ slug: string }>;
};

// https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#static-site-generation-getstaticprops

// OK when not so much users with doubles
// but with a lot, need to only generate when user update doubles list and uncomment next line
// export const dynamicParams = false;

export async function generateStaticParams() {
  const doublesSlugs = await prisma.user.findMany({
    where: {
      doublesPublicUrl: {
        not: null,
      },
    },
    select: {
      doublesPublicUrl: true,
    },
  });

  return doublesSlugs.map(({ doublesPublicUrl }) => ({
    slug: doublesPublicUrl,
  }));
}

export default async function DoublePage({ params }: DoublePageProps) {
  const { slug } = await params;
  const user = await prisma.user.findUnique({
    where: {
      doublesPublicUrl: slug,
    },
    select: {
      cardsOwned: true,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <Suspense>
      {user.cardsOwned.length > 0 ? (
        <>
          <p className={styles.introduction}>
            Un utilisateur vous met à disposition sa liste de carte en double,
            profitez en pour lui proposer des échanges !
          </p>
          <CardsWrapper userCards={user.cardsOwned} allCards={all_cards_flat} />
        </>
      ) : (
        <p>
          Oups l&apos;utilisateur n&apos;a pas encore renseigné de cartes en
          doubles.
        </p>
      )}
    </Suspense>
  );
}
