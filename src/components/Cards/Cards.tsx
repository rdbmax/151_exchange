"use client";
import { type Card as CardType } from "@DB/all_cards";
import Card from "@Components/Card/Card";
import { type CardsSelection } from "@Hooks/useCardsSelection";

import styles from "./cards.module.css";

type CardsProps = {
  cards: CardType[];
  isMyDoublesFilter?: boolean;
  isMyWishesFilter?: boolean;
  isPublicView?: boolean;
  doublesSelection: CardsSelection;
  wishesSelection: CardsSelection;
};

export default function Cards({
  isMyDoublesFilter = false,
  isMyWishesFilter = false,
  cards,
  isPublicView = false,
  doublesSelection,
  wishesSelection,
}: CardsProps) {
  const {
    isSelectionMode: isDoublesSelectionMode,
    userCards: userCardsDoubles,
    userCardsSelection: userCardsDoublesSelection,
    onCheckCard: onCheckCardAsDouble,
  } = doublesSelection;
  const {
    isSelectionMode: isWishesSelectionMode,
    userCards: userCardsWishes,
    userCardsSelection: userCardsWishesSelection,
    onCheckCard: onCheckCardAsWish,
  } = wishesSelection;

  const getHasCard = (card: CardType): boolean =>
    (isMyWishesFilter ? userCardsWishes : userCardsDoubles).includes(
      card.id as string
    );

  const getHasReverseCard = (card: CardType): boolean =>
    (isMyWishesFilter ? userCardsWishes : userCardsDoubles).includes(
      `${card.id}_r`
    );

  const getHasCardAsSelection = (card: CardType): boolean =>
    (isWishesSelectionMode
      ? userCardsWishesSelection
      : userCardsDoublesSelection
    ).includes(card.id as string);

  const getHasReverseCardAsSelection = (card: CardType): boolean =>
    (isWishesSelectionMode
      ? userCardsWishesSelection
      : userCardsDoublesSelection
    ).includes(`${card.id}_r`);

  return (
    <div className={styles.cardsGrid}>
      {cards.map((card, index) => (
        <Card
          key={`${card.id}_${isMyDoublesFilter}`}
          card={card}
          index={index}
          hasOwningIcons={isMyDoublesFilter || isMyWishesFilter || isPublicView}
          hasCard={getHasCard(card)}
          {...((card.hasReverseVersion || card.type === "reverse") && {
            hasReverseCard: getHasReverseCard(card),
          })}
          isSelectionMode={isDoublesSelectionMode || isWishesSelectionMode}
          hasCardAsSelection={getHasCardAsSelection(card)}
          {...((card.hasReverseVersion || card.type === "reverse") && {
            hasReverseCardAsSelection: getHasReverseCardAsSelection(card),
          })}
          onCheckCard={
            isWishesSelectionMode ? onCheckCardAsWish : onCheckCardAsDouble
          }
        />
      ))}
    </div>
  );
}
