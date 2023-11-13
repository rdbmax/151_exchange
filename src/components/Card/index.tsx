'use client';
import Image from "next/image";
import styles from "./styles.module.css";
import { Card } from "../../db/all_cards";

type CardProps = { card: Card; index: number };

export default function Card({ card, index }: CardProps) {
  return (
    <button className={styles.cardButton} onClick={() => console.log(card)}>
      <Image
        className={styles.cardImage}
        src={`/cards/sv03pt5-fr-${card.id}-2x.jpg`}
        alt={`${card.name} pokemon numéro ${card.id}`}
        width={659}
        height={920}
        priority={index < 15}
      />
    </button>
  );
}
