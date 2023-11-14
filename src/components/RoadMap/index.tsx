"use client";
import { Modal } from "@mui/base/Modal";
import { forwardRef, useState } from "react";

import styles from "./styles.module.css";

const Backdrop = forwardRef<HTMLDivElement, { open?: boolean }>(
  (props, ref) => {
    // https://github.com/mui/material-ui/issues/32882
    // @ts-ignore
    const { open, ownerState, ...other } = props;
    return <div ref={ref} {...other} className={styles.backdrop} />;
  }
);
Backdrop.displayName = "Backdrop";

export default function RoadMap() {
  const [isOpen, setIsOpen] = useState(false);

  return [
    <button
      key="triggerButton"
      onClick={() => setIsOpen(true)}
      className={styles.roadmapButton}
    >
      Roadmap
    </button>,
    <Modal
      key="modal"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={styles.modal}
      slots={{ backdrop: Backdrop }}
    >
      <div className={styles.modalContent}>
        <h2>Roadmap</h2>
        <ul className={styles.roadmapList}>
          <li className={styles.done}>
            Ajouter les illustrations des 3 dernieres cartes
          </li>
          <li className={styles.done}>filtrer sur les reverse</li>
          <li className={styles.done}>afficher la roadmap</li>
          <li>afficher les details d&apos;une carte</li>
          <li>version mobile</li>
          <li className={styles.done}>nom de domaine (www.151-exchange.com)</li>
          <li>authentification utilisateur</li>
          <li>base de donnée</li>
          <li>
            fonctionnalitées utilisateur (U) connecté
            <ul>
              <li>carte en double que l&apos;U détient</li>
              <li>carte en double que l&apos;U souhaite</li>
              <li>cartes que l&apos;U n&apos;a pas et détenu par une autre personne</li>
              <li>cartes que l&apos;U souhaite et détenu par une autre personne</li>
              <li>mise en contact entre U</li>
            </ul>
          </li>
        </ul>
      </div>
    </Modal>,
  ];
}
