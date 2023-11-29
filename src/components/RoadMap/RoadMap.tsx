"use client";
import clsx from "clsx";

import Modal from "@Components/Modal/Modal";
import styles from "./roadmap.module.css";

const ROADMAP: {
  done: boolean;
  text: string;
}[] = [
  { text: "Ajouter les illustrations des 3 dernieres cartes", done: true },
  { text: "filtrer sur les reverse", done: true },
  { text: "afficher la roadmap", done: true },
  { text: "nom de domaine (www.151-exchange.com)", done: true },
  { text: "authentification U", done: true },
  { text: "base de donnée", done: true },
  { text: "U peut définir une liste de ses cartes en double", done: true },
  {
    text: "U peut rendre sa collection de double public via une url",
    done: true,
  },
  { text: "U peut définir une liste de cartes souhaitées", done: true },
  { text: "U peut rendre sa liste de souhaits public via une url", done: true },
  { text: "version mobile", done: false },
  { text: "ISR pour les pages doubles et souhaits", done: false },
  { text: "afficher les details d'une carte", done: false },
  { text: "Design de la page 404", done: false },
  { text: "Pouvoir supprimer ses pages publique", done: false },
  { text: "Pouvoir re-générer les urls des pages publique", done: false },
  { text: "Branding : logo, favicon, meta de partages", done: false },
  { text: "Ajouter une snackbar pour confirmer les actions U", done: false },
  { text: "Ajouter une légende pour les icones sur les cartes", done: false },
];

export default function RoadMap() {
  return (
    <Modal buttonContent="Roadmap">
      <>
        <h2>
          Roadmap <span className={styles.legend}>U = Utilisateur</span>
        </h2>
        <ul className={styles.roadmapList}>
          {ROADMAP.map(({ text, done }) => (
            <li key={text} className={clsx(done && styles.done)}>
              {text}
            </li>
          ))}
        </ul>
      </>
    </Modal>
  );
}
