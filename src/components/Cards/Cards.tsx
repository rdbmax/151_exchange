"use client";
import { type Card as CardType } from "@DB/all_cards";
import Card from "@Components/Card/Card";
import { type CardsSelection } from "@Hooks/useCardsSelection";

import styles from "./cards.module.css";

type CardsProps = {
  cards: CardType[];
  isSelectionMode?: boolean;
  isMyDoublesFilter?: boolean;
  isPublicView?: boolean;
  userCards: CardsSelection["userCards"];
  userCardsSelection: CardsSelection["userCardsSelection"];
  onCheckCard?: CardsSelection["onCheckCard"];
};

export default function Cards({
  isSelectionMode = false,
  isMyDoublesFilter = false,
  cards,
  userCards,
  userCardsSelection,
  onCheckCard = () => {},
  isPublicView = false,
}: CardsProps) {
  return (
    <div className={styles.cardsGrid}>
      {cards.map((card, index) => (
        <Card
          key={`${card.id}_${isMyDoublesFilter}`}
          card={card}
          index={index}
          isSelectionMode={isSelectionMode}
          isMyDoublesMode={isMyDoublesFilter || isPublicView}
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
  );
}
