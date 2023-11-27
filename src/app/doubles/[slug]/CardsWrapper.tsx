"use client";
import { type Card } from "@DB/all_cards";
import Cards from "@Components/Cards/Cards";
import useCardsListFilters from "@Hooks/useCardsListFilters";
import useCardsSelection from "@Hooks/useCardsSelection";

type CardsWrapperProps = {
  allCards: Card[];
  userCards: string[];
};

export default function CardsWrapper({
  allCards,
  userCards,
}: CardsWrapperProps) {
  const cardsListFilters = useCardsListFilters({
    isSelectionMode: false,
    cardsOwned: userCards,
    isMyDoublesFilterDefault: true,
  });
  const cards = cardsListFilters.applyFilters(allCards);
  const fakeDoublesSelection = useCardsSelection({ isPublicView: true });
  const fakeWishesSelection = useCardsSelection({ isPublicView: true });

  return (
    <Cards
      isPublicView
      isMyDoublesFilter
      cards={cards}
      doublesSelection={{ ...fakeDoublesSelection, userCards: userCards }}
      wishesSelection={fakeWishesSelection}
    />
  );
}
