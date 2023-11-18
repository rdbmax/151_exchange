"use client";
import { type ChangeEvent } from "react";

import { Rarity, Type } from "@DB/all_cards";

import styles from "./filters.module.css";

type FiltersProps = {
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  setFilterType: (filterButton: Type) => void;
  typeFilter: Type | undefined;
  setFilterRarity: (filterButton: Rarity) => void;
  rarityFilter: Rarity | undefined;
  nameFilter: string;
  cardsCount: number;
  removeFilter: VoidFunction;
  isSelectionMode: Boolean;
  isMyDoublesFilter: Boolean;
};

export default function Filters({
  onChangeName,
  nameFilter,
  setFilterType,
  typeFilter,
  setFilterRarity,
  rarityFilter,
  cardsCount,
  removeFilter,
  isSelectionMode,
  isMyDoublesFilter,
}: FiltersProps) {
  return (
    <>
      <label htmlFor="filtre-par-nom" className={styles.inputLabel}>
        pokemon
      </label>
      <input
        type="text"
        id="filtre-par-nom"
        className={styles.input}
        onChange={onChangeName}
        value={nameFilter}
      />
      <ul className={styles.filters}>
        <li>
          Type
          <ul className={styles.filter}>
            {Object.values(Type)
              .filter(
                isSelectionMode ? (type) => type !== Type.reverse : () => true
              )
              .map((type) => (
                <li key={type}>
                  <button
                    onClick={() => setFilterType(type)}
                    className={`${styles.filterButton} ${
                      typeFilter === type ? styles.activeFilterButton : ""
                    }`}
                  >
                    {type}
                  </button>
                </li>
              ))}
          </ul>
        </li>
        <li>
          Rareté
          <ul className={styles.filter}>
            {Object.values(Rarity).map((rarity) => (
              <li key={rarity}>
                <button
                  onClick={() => setFilterRarity(rarity)}
                  className={`${styles.filterButton} ${
                    rarityFilter === rarity ? styles.activeFilterButton : ""
                  }`}
                >
                  {rarity}
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <span className={styles.cardsCount}>{cardsCount} cartes</span>
      {(typeFilter || rarityFilter || isMyDoublesFilter) && (
        <button onClick={removeFilter} className={styles.removeFilter}>
          Retirer le filtre
        </button>
      )}
    </>
  );
}
