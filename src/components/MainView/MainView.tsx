"use client";
import { type Card as CardType } from "@DB/all_cards";
import Aside from "@Components/Aside/Aside";
import Cards from "@Components/Cards/Cards";
import useCardsListFilters from "@Hooks/useCardsListFilters";
import { type CardsSelection } from "@Hooks/useCardsSelection";

import styles from "./mainView.module.css";

type MainViewProps = {
  allCards: CardType[];
  isPublicView?: boolean;
  doublesSelection: CardsSelection;
  wishesSelection: CardsSelection;
};

export default function MainView({
  allCards,
  isPublicView = false,
  doublesSelection,
  wishesSelection,
}: MainViewProps) {
  const cardsListFilters = useCardsListFilters({
    isSelectionMode:
      doublesSelection.isSelectionMode || wishesSelection.isSelectionMode,
  });
  const cards = cardsListFilters.applyFilters(allCards);

  return [
    <section key="cards" className={styles.cardsSection}>
      <Cards
        isMyDoublesFilter={cardsListFilters.isMyDoublesFilter}
        isMyWishesFilter={cardsListFilters.isMyWishesFilter}
        cards={cards}
        isPublicView={isPublicView}
        doublesSelection={doublesSelection}
        wishesSelection={wishesSelection}
      />
    </section>,
    !isPublicView && (
      // TODO: wishes here then tests
      <Aside
        key="aside"
        cardsCount={cards.length}
        isSelectionMode={
          doublesSelection.isSelectionMode || wishesSelection.isSelectionMode
        }
        cardsListFilters={cardsListFilters}
      />
    ),
  ];
}
