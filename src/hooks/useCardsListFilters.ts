"use client";
import * as R from "ramda";
import { useState, type ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";

import { type Card, Rarity, Type } from "@DB/all_cards";

export type CardsListFilters = {
  nameFilter: string;
  setNameFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  applyFilters: (allCards: Card[]) => Card[];
  rarityFilter: Rarity | null;
  setRarityFilter: (rarity: Rarity) => void;
  typeFilter: Type | null;
  setTypeFilter: (type: Type) => void;
  removeFilter: VoidFunction;
  displayMyDoubles: VoidFunction;
  displayMyWishes: VoidFunction;
  isMyDoublesFilter: boolean;
  isMyWishesFilter: boolean;
};

type UseCardsListFilters = (params: {
  isSelectionMode: Boolean;
  cardsOwned?: string[];
  desiredCards?: string[];
  isMyDoublesFilterDefault?: boolean;
  isMyWishesFilterDefault?: boolean;
}) => CardsListFilters;

const useCardsListFilters: UseCardsListFilters = function useCardsListFilters({
  isSelectionMode,
  cardsOwned,
  desiredCards,
  isMyDoublesFilterDefault = false,
  isMyWishesFilterDefault = false,
}) {
  const { data: session } = useSession();
  const [nameFilter, setName] = useQueryState(
    "name",
    parseAsString.withDefault("").withOptions({ history: "push" })
  );
  const [rarityFilter, setRarity] = useQueryState(
    "rarity",
    parseAsStringEnum<Rarity>(Object.values(Rarity)).withOptions({
      history: "push",
    })
  );
  const [typeFilter, setType] = useQueryState(
    "type",
    parseAsStringEnum<Type>(Object.values(Type)).withOptions({
      history: "push",
    })
  );
  const [isMyDoublesFilter, setIsMyDoublesFilter] = useState<boolean>(
    isMyDoublesFilterDefault
  );
  const [isMyWishesFilter, setIsMyWishesFilter] = useState<boolean>(
    isMyWishesFilterDefault
  );

  const doublesIdList = cardsOwned || session?.user.cardsOwned || [];
  const wishesIdList = desiredCards || session?.user.desiredCards || [];

  if (isSelectionMode && typeFilter === Type.reverse) {
    setType(null);
    alert(
      "attention: Il est pour le moment impossible de séléctionner les doubles avec le filtre reverse; la séléction des reverse se fait au survol des cartes."
    );
  }

  const setNameFilter = (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<URLSearchParams> => setName(event.target.value);

  const applyFilterByName = ({ name }: Card) =>
    name.toLowerCase().includes(nameFilter.toLowerCase());
  const applyFilterByRarity = ({ rarity }: Card) => rarity === rarityFilter;
  const applyFilterBType = ({ type }: Card) => type === typeFilter;
  const applyFilterMyDoubles = ({ id }: Card) =>
    doublesIdList.includes(id as string);
  const applyFilterMyWishes = ({ id }: Card) =>
    wishesIdList.includes(id as string);

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
    if (isMyDoublesFilter || isMyWishesFilter) {
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
    if (isMyWishesFilter) {
      return allCards.filter(applyFilterMyWishes);
    }

    if (
      !nameFilter &&
      !rarityFilter &&
      !typeFilter &&
      !isMyDoublesFilter &&
      !isMyWishesFilter
    )
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
    setType(null);
    setIsMyDoublesFilter(false);
    setIsMyWishesFilter(false);
  };

  const setTypeFilter = (type: Type) => {
    setType(type);
    setRarity(null);
    setIsMyDoublesFilter(false);
    setIsMyWishesFilter(false);
  };

  const displayMyDoubles = () => {
    setIsMyDoublesFilter(true);
    setIsMyWishesFilter(false);
    setType(null);
    setRarity(null);
  };

  const displayMyWishes = () => {
    setIsMyDoublesFilter(false);
    setIsMyWishesFilter(true);
    setType(null);
    setRarity(null);
  };

  const removeFilter = () => {
    setType(null);
    setRarity(null);
    setIsMyDoublesFilter(false);
    setIsMyWishesFilter(false);
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
    displayMyWishes,
    isMyDoublesFilter,
    isMyWishesFilter,
  };
};

export default useCardsListFilters;
