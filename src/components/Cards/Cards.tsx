"use client";
import { type Card as CardType } from "@DB/all_cards";
import Card from "@Components/Card/Card";
import Aside from "@Components/Aside/Aside";
import useCardsListFilters from "@Hooks/useCardsListFilters";
import { type CardsSelection } from "@Hooks/useCardsSelection";

import styles from "./cards.module.css";

type CardsProps = {
  allCards: CardType[];
  isSelectionMode: boolean;
  userCards: CardsSelection["userCards"];
  userCardsSelection: CardsSelection["userCardsSelection"];
  onCheckCard: CardsSelection["onCheckCard"];
};

export default function Cards({
  isSelectionMode,
  allCards,
  userCards,
  userCardsSelection,
  onCheckCard,
}: CardsProps) {
  const cardsListFilters = useCardsListFilters({ isSelectionMode });
  const cards = cardsListFilters.applyFilters(allCards);

  return [
    <section key="cards" className={styles.cardsSection}>
      <div className={styles.cardsGrid}>
        {cards.map((card, index) => (
          <Card
            key={`${card.id}_${cardsListFilters.isMyDoublesFilter}`}
            card={card}
            index={index}
            isSelectionMode={isSelectionMode}
            isMyDoublesMode={cardsListFilters.isMyDoublesFilter}
            hasCard={userCards.includes(card.id as string)}
            {...((card.hasReverseVersion || card.type === "reverse") && {
              hasReverseCard: userCards.includes(`${card.id}_r`),
            })}
            hasCardAsSelection={userCardsSelection.includes(card.id as string)}
            {...((card.hasReverseVersion || card.type === "reverse") && {
              hasReverseCardAsSelection: userCardsSelection.includes(
                `${card.id}_r`
              ),
            })}
            onCheckCard={onCheckCard}
          />
        ))}
      </div>
    </section>,
    <Aside
      key="aside"
      cardsCount={cards.length}
      isSelectionMode={isSelectionMode}
      cardsListFilters={cardsListFilters}
    />,
  ];
}
