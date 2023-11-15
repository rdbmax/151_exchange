'use client';
import Image from "next/image";

import { Card } from "../../db/all_cards";
import cards from '../../cards'

import styles from "./card.module.css";

type CardProps = { card: Card; index: number };

export default function Card({ card, index }: CardProps) {
  if (index > 203) return null

  return (
    <button className={styles.cardButton} onClick={() => console.log(card)}>
      <Image
        className={styles.cardImage}
        src={cards[Number(card.id) - 1]}
        alt={`${card.name} pokemon numéro ${card.id}`}
        width={659}
        height={920}
        priority={index < 15}
        placeholder="blur"
      />
    </button>
  );
}
