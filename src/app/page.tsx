"use client";
import { all_cards_flat } from "@DB/all_cards";
import MainView from "@Components/MainView/MainView";
import Header from "@Components/Header/Header";
import useCardsSelection from "@Hooks/useCardsSelection";

import styles from "./page.module.css";

export default function Home() {
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
      <MainView
        isSelectionMode={isSelectionMode}
        allCards={all_cards_flat}
        userCards={userCards}
        userCardsSelection={userCardsSelection}
        onCheckCard={onCheckCard}
      />
    </main>,
  ];
}
