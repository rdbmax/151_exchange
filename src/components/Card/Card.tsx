"use client";
import Image from "next/image";

import { type Card, Type } from "../../db/all_cards";
import cards from "../../cards";

import styles from "./card.module.css";

type CardProps = {
  /** Generic information about card itself */
  card: Card;
  /** Used to set priority on image lazy loading */
  index: number;
  isSelectionMode?: boolean;
  /** True to display icons about the user is owning the card */
  hasOwningIcons: boolean;
  /** Used to display doubles and wishes */
  hasCard: boolean;
  /** Used to display doubles and wishes, reverses */
  hasReverseCard?: boolean;
  /** Used to select doubles and wishes */
  hasCardAsSelection: boolean;
  /** Used to select doubles and wishes, reverses */
  hasReverseCardAsSelection?: boolean;
  /** Used to select doubles and wishes */
  onCheckCard: (id: string) => void;
};

export default function Card({
  card,
  index,
  isSelectionMode = false,
  hasOwningIcons,
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
      {!isSelectionMode && hasOwningIcons && (hasCard || hasReverseCard) && (
        <div className={styles.cardOwnedContainer}>
          {hasCard && (
            <div className={styles.cardOwned} aria-label={card.type}>
              <span>{card.type[0].toUpperCase()}</span>
            </div>
          )}
          {hasReverseCard && (
            <div className={styles.cardOwned} aria-label={Type.reverse}>
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
