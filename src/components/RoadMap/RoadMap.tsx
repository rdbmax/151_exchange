"use client";
import { forwardRef, useState } from "react";
import { Modal } from "@mui/base/Modal";

import styles from "./roadmap.module.css";

const Backdrop = forwardRef<HTMLDivElement, { open?: boolean }>(
  (props, ref) => {
    // @ts-ignore https://github.com/mui/material-ui/issues/32882
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
          <li className={styles.done}>authentification utilisateur</li>
          <li className={styles.done}>base de donnée</li>
          <li>
            fonctionnalitées utilisateur (U) connecté
            <ul>
              <li>carte en double que l&apos;U détient</li>
              <li>carte en double que l&apos;U souhaite</li>
              <li>
                U peut générer une URL publique qui affiche les carte qu&apos;il
                détient ou souhaite
              </li>
              <li>
                cartes que l&apos;U n&apos;a pas et détenu par une autre
                personne
              </li>
              <li>
                cartes que l&apos;U souhaite et détenu par une autre personne
              </li>
              <li>mise en contact entre U</li>
              <li>U peut rendre sa collection de double public via une url</li>
            </ul>
          </li>
        </ul>
      </div>
    </Modal>,
  ];
}
