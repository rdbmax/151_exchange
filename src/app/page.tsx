"use client";
import { Suspense } from "react";
import { all_cards_flat } from "@DB/all_cards";
import MainView from "@Components/MainView/MainView";
import Header from "@Components/Header/Header";
import useCardsSelection from "@Hooks/useCardsSelection";

import styles from "./page.module.css";

export default function Home() {
  const doublesSelection = useCardsSelection({ dataSet: "cardsOwned" });
  const wishesSelection = useCardsSelection({ dataSet: "desiredCards" });

  return (
    <Suspense>
      <Header
        key="header"
        doublesSelection={doublesSelection}
        wishesSelection={wishesSelection}
      />
      <main key="main" className={styles.main}>
        <MainView
          allCards={all_cards_flat}
          doublesSelection={doublesSelection}
          wishesSelection={wishesSelection}
        />
      </main>
    </Suspense>
  );
}
