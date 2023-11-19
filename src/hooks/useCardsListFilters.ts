"use client";
import * as R from "ramda";
import { useState, type ChangeEvent } from "react";
import { useSession } from "next-auth/react";

import { type Card, type Rarity, Type } from "@DB/all_cards";

export type CardsListFilters = {
  nameFilter: string;
  setNameFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  applyFilters: (allCards: Card[]) => Card[];
  rarityFilter: Rarity | undefined;
  setRarityFilter: (rarity: Rarity) => void;
  typeFilter: Type | undefined;
  setTypeFilter: (type: Type) => void;
  removeFilter: VoidFunction;
  displayMyDoubles: VoidFunction;
  isMyDoublesFilter: boolean;
};

type UseCardsListFilters = (params: {
  isSelectionMode: Boolean;
  cardsOwned?: string[];
  isMyDoublesFilterDefault?: boolean;
}) => CardsListFilters;

const useCardsListFilters: UseCardsListFilters = function useCardsListFilters({
  isSelectionMode,
  cardsOwned,
  isMyDoublesFilterDefault = false,
}) {
  const { data: session } = useSession();
  const [nameFilter, setName] = useState<string>("");
  const [rarityFilter, setRarity] = useState<Rarity>();
  const [typeFilter, setType] = useState<Type>();
  const [isMyDoublesFilter, setIsMyDoublesFilter] = useState<boolean>(
    isMyDoublesFilterDefault
  );

  const doublesIdList = cardsOwned || session?.user.cardsOwned || [];

  if (isSelectionMode && typeFilter === Type.reverse) {
    setType(undefined);
    alert(
      "attention: Il est pour le moment impossible de séléctionner les doubles avec le filtre reverse; la séléction des reverse se fait au survol des cartes."
    );
  }

  const setNameFilter = (event: ChangeEvent<HTMLInputElement>): void =>
    setName(event.target.value);

  const applyFilterByName = ({ name }: Card) =>
    name.toLowerCase().includes(nameFilter.toLowerCase());
  const applyFilterByRarity = ({ rarity }: Card) => rarity === rarityFilter;
  const applyFilterBType = ({ type }: Card) => type === typeFilter;
  const applyFilterMyDoubles = ({ id }: Card) =>
    doublesIdList.includes(id as string);

  const removeReverseSuffix = (id: string) => String(id).slice(0, -2);

  const removeReverseWhenNoReverseFilter = (cards: Card[]) => {
    // when filter is reverse it display all reverse cards as normal transforming keys
    if (typeFilter === Type.reverse)
      return cards.map((card) => ({
        ...card,
        id: removeReverseSuffix(card.id as string),
      }));

    // when filter is double it returns all doubles and removes only '_r' from keys
    // then dedupe because when use has normal and reverse version
    if (isMyDoublesFilter) {
      const allDoubles = cards.map((card) =>
        card.type === "reverse"
          ? { ...card, id: removeReverseSuffix(card.id as string) }
          : card
      );

      return R.uniqBy(R.prop("id"), allDoubles);
    }

    // otherwise it remove all reverse
    return cards.filter(({ type }: Card) => type !== Type.reverse);
  };

  // should be nice to add ramda here
  const applyFilters = (allCards: Card[]) => {
    if (isMyDoublesFilter) {
      return allCards.filter(applyFilterMyDoubles);
    }

    if (!nameFilter && !rarityFilter && !typeFilter && !isMyDoublesFilter)
      return allCards;

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
    setIsMyDoublesFilter(false);
  };

  const setTypeFilter = (type: Type) => {
    setType(type);
    setRarity(undefined);
    setIsMyDoublesFilter(false);
  };

  const displayMyDoubles = () => {
    setIsMyDoublesFilter(true);
    setType(undefined);
    setRarity(undefined);
  };

  const removeFilter = () => {
    setType(undefined);
    setRarity(undefined);
    setIsMyDoublesFilter(false);
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
    displayMyDoubles,
    isMyDoublesFilter,
  };
};

export default useCardsListFilters;
