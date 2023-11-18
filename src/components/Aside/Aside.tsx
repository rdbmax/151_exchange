"use client";
import { HTMLAttributes } from 'react';
import { useSession } from "next-auth/react";

import Filters from "@Components/Filters/Filters";
import RoadMap from "@Components/RoadMap/RoadMap";
import Button from "@Components/Button/Button";
import { type CardsListFilters } from "@Hooks/useCardsListFilters";

import styles from "./aside.module.css";

type CardsProps = {
  isSelectionMode: boolean;
  cardsCount: number;
  cardsListFilters: CardsListFilters;
} & HTMLAttributes<HTMLElement>;

export default function Cards({ isSelectionMode, cardsCount, cardsListFilters }: CardsProps) {
  const {
    nameFilter,
    setNameFilter,
    setRarityFilter,
    rarityFilter,
    setTypeFilter,
    typeFilter,
    removeFilter,
    displayMyDoubles,
    isMyDoublesFilter,
  } = cardsListFilters;

  const { status: sessionStatus } = useSession();

  return (
    <aside className={styles.filtersGrid}>
      <div className={styles.filtersSticky}>
        <Filters
          onChangeName={setNameFilter}
          nameFilter={nameFilter}
          setFilterRarity={setRarityFilter}
          rarityFilter={rarityFilter}
          setFilterType={setTypeFilter}
          typeFilter={typeFilter}
          cardsCount={cardsCount}
          removeFilter={removeFilter}
          isSelectionMode={isSelectionMode}
          isMyDoublesFilter={isMyDoublesFilter}
        />
      </div>
      <div className={styles.fixedAsideButtons}>
        {sessionStatus === "authenticated" && (
          <Button active={isMyDoublesFilter} onClick={displayMyDoubles}>Mes cartes doubles</Button>
        )}
        <RoadMap />
      </div>
    </aside>
  );
}
