"use client";
import Image from "next/image";
import clsx from "clsx";

import { Card } from "../../db/all_cards";
import cards from "../../cards";

import styles from "./card.module.css";

type CardProps = {
  card: Card;
  index: number;
  isSelectionMode?: boolean;
  isMyDoublesMode?: boolean;
  onCheckCard: (id: string) => void;
  hasCard: boolean;
  hasReverseCard?: boolean;
  hasCardAsSelection: boolean;
  hasReverseCardAsSelection?: boolean;
};

export default function Card({
  card,
  index,
  isSelectionMode = false,
  isMyDoublesMode = false,
  onCheckCard,
  hasCard,
  hasReverseCard,
  hasCardAsSelection,
  hasReverseCardAsSelection,
}: CardProps) {
  const { name, hasReverseVersion } = card;
  const idAsString = card.id as string;

  return (
    <button className={styles.cardButton} onClick={() => console.log(card)}>
      <Image
        className={styles.cardImage}
        src={cards[Number(idAsString) - 1]}
        alt={`${name} pokemon numéro ${idAsString}`}
        width={659}
        height={920}
        priority={index < 15}
        placeholder="blur"
      />
      {!isSelectionMode && isMyDoublesMode && (hasCard || hasReverseCard) && (
        <div className={styles.cardOwnedContainer}>
          {hasCard && (
            <div className={styles.cardOwned}>
              <span>✅</span>
            </div>
          )}
          {hasReverseCard && (
            <div className={clsx(styles.cardOwned, styles.reverseOwned)}>
              <span>R</span>
            </div>
          )}
        </div>
      )}
      {isSelectionMode && (
        <div className={styles.selectionLayer}>
          <div>
            <input
              type="checkbox"
              id={idAsString}
              name={idAsString}
              checked={hasCardAsSelection}
              onChange={() => onCheckCard(idAsString)}
            />
            <label
              className={styles.labelForSelection}
              htmlFor={idAsString}
            >{`${name} (${idAsString})`}</label>
          </div>
          {hasReverseVersion && (
            <div>
              <input
                type="checkbox"
                id={`${idAsString}_r`}
                name={`${idAsString}_r`}
                checked={hasReverseCardAsSelection}
                onChange={() => onCheckCard(`${idAsString}_r`)}
              />
              <label
                className={styles.labelForSelection}
                htmlFor={`${idAsString}_r`}
              >{`${name} (${idAsString}) Reverse`}</label>
            </div>
          )}
        </div>
      )}
    </button>
  );
}
