"use client";

import { type Card as CardType } from "../../db/all_cards";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";
import RoadMap from "../RoadMap/RoadMap";
import useCardsListFilters from "../../hooks/useCardsListFilters";

import styles from "./cards.module.css";

type CardsProps = {
  allCards: CardType[];
};

export default function Cards({ allCards }: CardsProps) {
  const {
    nameFilter,
    setNameFilter,
    applyFilters,
    setRarityFilter,
    rarityFilter,
    setTypeFilter,
    typeFilter,
    removeFilter,
  } = useCardsListFilters();

  const cards = applyFilters(allCards);

  return [
    <section key="cards" className={styles.cardsSection}>
      <div className={styles.cardsGrid}>
        {cards.map((card, index) => (
          <Card key={card.id} {...{ card, index }} />
        ))}
      </div>
    </section>,
    <aside key="aside" className={styles.filtersGrid}>
      <div className={styles.filtersSticky}>
        <Filters
          onChangeName={setNameFilter}
          nameFilter={nameFilter}
          setFilterRarity={setRarityFilter}
          rarityFilter={rarityFilter}
          setFilterType={setTypeFilter}
          typeFilter={typeFilter}
          cardsCount={cards.length}
          removeFilter={removeFilter}
        />
      </div>
      <RoadMap />
    </aside>,
  ];
}
