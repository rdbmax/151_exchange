"use client";

import { type ChangeEvent } from "react";

import styles from "./styles.module.css";

type FiltersProps = {
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  nameFilter: string;
};

export default function Filters({ onChangeName, nameFilter }: FiltersProps) {
  return (
    <section className={styles.filtersGrid}>
      <div className={styles.filtersSticky}>
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
              <li>
                <button className={styles.filterButton}>Normal</button>
              </li>
              <li>
                <button className={styles.filterButton}>Reverse</button>
              </li>
              <li>
                <button className={styles.filterButton}>Holographique</button>
              </li>
              <li>
                <button className={styles.filterButton}>Secrète</button>
              </li>
            </ul>
          </li>
          <li>
            Rareté
            <ul className={styles.filter}>
              <li>
                <button className={styles.filterButton}>Normal</button>
              </li>
              <li>
                <button className={styles.filterButton}>Reverse</button>
              </li>
              <li>
                <button className={styles.filterButton}>Holographique</button>
              </li>
              <li>
                <button className={styles.filterButton}>Secrète</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
