"use client";

import { useState, type ChangeEvent } from "react";

import { type Card } from "../db/all_cards";

type CardsListFilters = {
  nameFilter: string;
  setNameFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  applyFilters: (allCards: Card[]) => Card[];
};

export default function useCardsListFilters(): CardsListFilters {
  const [nameFilter, setName] = useState<string>("");

  const setNameFilter = (event: ChangeEvent<HTMLInputElement>): void =>
    setName(event.target.value);

  const applyFilters = (allCards: Card[]) => {
    if (!nameFilter) return allCards;

    return allCards.filter(({ name }) =>
      name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  };

  return {
    nameFilter,
    setNameFilter,
    applyFilters,
  };
}
