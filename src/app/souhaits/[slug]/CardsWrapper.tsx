"use client";
import { type Card } from "@DB/all_cards";
import Cards from "@Components/Cards/Cards";
import useCardsListFilters from "@Hooks/useCardsListFilters";

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

  return (
    <Cards
      isMyDoublesFilter
      cards={cards}
      userCards={userCards}
      userCardsSelection={[]}
      onCheckCard={() => {}}
      isPublicView
    />
  );
}
