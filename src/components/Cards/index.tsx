"use client";

import styles from "./styles.module.css";
import { type Card as CardType } from "../../db/all_cards";
import Card from "../Card";
import Filters from "../Filters";
import useCardsListFilters from "../../hooks/useCardsListFilters";

type CardsProps = {
  allCards: CardType[];
};

export default function Cards({ allCards }: CardsProps) {
  const { nameFilter, setNameFilter, applyFilters } = useCardsListFilters();

  return [
    <section key="cards" className={styles.cardsSection}>
      <div className={styles.cardsGrid}>
        {applyFilters(allCards)
          .filter(({ type }) => type !== "reverse")
          .map((card, index) => (
            <Card key={card.id} {...{ card, index }} />
          ))}
      </div>
    </section>,
    <Filters
      key="filters"
      onChangeName={setNameFilter}
      nameFilter={nameFilter}
    />,
  ];
}
