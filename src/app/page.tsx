"use client";
import { useState } from "react";
import { all_cards_flat } from "@DB/all_cards";
import Cards from "@Components/Cards/Cards";
import Header from "@Components/Header/Header";
import useCardsSelection from "@Hooks/useCardsSelection";

// import prisma from "../../lib/prisma";

import styles from "./page.module.css";

export default function Home() {
  // if (process.env.NODE_ENV === "development") {
  //   const users = await prisma.user.findMany();
  //   console.log({ users });
  // }

  const {
    userCards,
    userCardsSelection,
    onCheckCard,
    onValidateSelection,
    onStartSelectionMode,
    onStopSelectionMode,
    isSelectionMode,
  } = useCardsSelection();

  return [
    <Header
      key="header"
      onStartSelectionMode={onStartSelectionMode}
      isSelectionMode={isSelectionMode}
      onValidateDoubles={onValidateSelection}
      onStopSelectionMode={onStopSelectionMode}
    />,
    <main key="main" className={styles.main}>
      <Cards
        isSelectionMode={isSelectionMode}
        allCards={all_cards_flat}
        userCards={userCards}
        userCardsSelection={userCardsSelection}
        onCheckCard={onCheckCard}
      />
    </main>,
  ];
}
