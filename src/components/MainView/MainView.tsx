"use client";
import { type Card as CardType } from "@DB/all_cards";
import Aside from "@Components/Aside/Aside";
import Cards from "@Components/Cards/Cards";
import useCardsListFilters from "@Hooks/useCardsListFilters";
import { type CardsSelection } from "@Hooks/useCardsSelection";

import styles from "./mainView.module.css";

type MainViewProps = {
  allCards: CardType[];
  isSelectionMode?: boolean;
  isPublicView?: boolean;
  userCards: CardsSelection["userCards"];
  userCardsSelection: CardsSelection["userCardsSelection"];
  onCheckCard?: CardsSelection["onCheckCard"];
};

export default function MainView({
  isSelectionMode = false,
  allCards,
  userCards,
  userCardsSelection,
  onCheckCard = () => {},
  isPublicView = false,
}: MainViewProps) {
  const cardsListFilters = useCardsListFilters({ isSelectionMode });
  const cards = cardsListFilters.applyFilters(allCards);

  return [
    <section key="cards" className={styles.cardsSection}>
      <Cards
        isSelectionMode={isSelectionMode}
        isMyDoublesFilter={cardsListFilters.isMyDoublesFilter}
        cards={cards}
        userCards={userCards}
        userCardsSelection={userCardsSelection}
        onCheckCard={onCheckCard}
        isPublicView={isPublicView}
      />
    </section>,
    !isPublicView && (
      <Aside
        key="aside"
        cardsCount={cards.length}
        isSelectionMode={isSelectionMode}
        cardsListFilters={cardsListFilters}
      />
    ),
  ];
}
