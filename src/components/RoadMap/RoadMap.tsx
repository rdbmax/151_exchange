"use client";
import { forwardRef, useState } from "react";
import { Modal } from "@mui/base/Modal";

import Button from "@Components/Button/Button";
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
    <Button key="triggerButton" onClick={() => setIsOpen(true)} active={isOpen}>
      Roadmap
    </Button>,
    <Modal
      key="modal"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={styles.modal}
      slots={{ backdrop: Backdrop }}
    >
      <div className={styles.modalContent}>
        <h2>Roadmap <span className={styles.legend}>U = Utilisateur</span></h2>
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
          <li className={styles.done}>U peut définir une liste de ses cartes en double</li>
          <li>U peut définir une liste de cartes souhaitées</li>
          <li>U peut rendre sa collection de double public via une url</li>
          <li>U peut rendre sa liste de souhaits public via une url</li>
        </ul>
      </div>
    </Modal>,
  ];
}
