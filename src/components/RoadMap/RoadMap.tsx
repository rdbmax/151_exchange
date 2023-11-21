"use client";
import Modal from "@Components/Modal/Modal";
import styles from "./roadmap.module.css";

export default function RoadMap() {
  return (
    <Modal buttonContent="Roadmap">
      <>
        <h2>
          Roadmap <span className={styles.legend}>U = Utilisateur</span>
        </h2>
        <ul className={styles.roadmapList}>
          <li className={styles.done}>
            Ajouter les illustrations des 3 dernieres cartes
          </li>
          <li className={styles.done}>filtrer sur les reverse</li>
          <li className={styles.done}>afficher la roadmap</li>
          <li className={styles.done}>nom de domaine (www.151-exchange.com)</li>
          <li className={styles.done}>authentification utilisateur</li>
          <li className={styles.done}>base de donnée</li>
          <li className={styles.done}>
            U peut définir une liste de ses cartes en double
          </li>
          <li className={styles.done}>
            U peut rendre sa collection de double public via une url
          </li>
          <li>U peut définir une liste de cartes souhaitées</li>
          <li>U peut rendre sa liste de souhaits public via une url</li>
          <li>afficher les details d&apos;une carte</li>
          <li>version mobile</li>
        </ul>
      </>
    </Modal>
  );
}
