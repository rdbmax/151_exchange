"use client";

import { useState, type ChangeEvent } from "react";

import { type Card, type Rarity, Type } from "@DB/all_cards";

type CardsListFilters = {
  nameFilter: string;
  setNameFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  applyFilters: (allCards: Card[]) => Card[];
  rarityFilter: Rarity | undefined;
  setRarityFilter: (rarity: Rarity) => void;
  typeFilter: Type | undefined;
  setTypeFilter: (type: Type) => void;
  removeFilter: VoidFunction;
};

export default function useCardsListFilters(): CardsListFilters {
  const [nameFilter, setName] = useState<string>("");
  const [rarityFilter, setRarity] = useState<Rarity>();
  const [typeFilter, setType] = useState<Type>();

  const setNameFilter = (event: ChangeEvent<HTMLInputElement>): void =>
    setName(event.target.value);

  const applyFilterByName = ({ name }: Card) =>
    name.toLowerCase().includes(nameFilter.toLowerCase());
  const applyFilterByRarity = ({ rarity }: Card) => rarity === rarityFilter;
  const applyFilterBType = ({ type }: Card) => type === typeFilter;

  const removeReverseWhenNoReverseFilter = (cards: Card[]) => {
    if (typeFilter === Type.reverse)
      return cards.map((card) => ({
        ...card,
        id: String(card.id).slice(0, -2),
      }));

    return cards.filter(({ type }: Card) => type !== Type.reverse);
  };

  // should be nice to add ramda here
  const applyFilters = (allCards: Card[]) => {
    if (!nameFilter && !rarityFilter && !typeFilter) return allCards;

    const filteredByName = nameFilter
      ? allCards.filter(applyFilterByName)
      : allCards;

    if (rarityFilter) return filteredByName.filter(applyFilterByRarity);
    if (typeFilter) return filteredByName.filter(applyFilterBType);

    return filteredByName;
  };

  const applyFiltersThenRemoveReverseWhenNecessary = (allCards: Card[]) =>
    removeReverseWhenNoReverseFilter(applyFilters(allCards));

  const setRarityFilter = (rarity: Rarity) => {
    setRarity(rarity);
    setType(undefined);
  };

  const setTypeFilter = (type: Type) => {
    setType(type);
    setRarity(undefined);
  };

  const removeFilter = () => {
    setType(undefined);
    setRarity(undefined);
  };

  return {
    nameFilter,
    setNameFilter,
    applyFilters: applyFiltersThenRemoveReverseWhenNecessary,
    rarityFilter,
    setRarityFilter,
    setTypeFilter,
    typeFilter,
    removeFilter,
  };
}
