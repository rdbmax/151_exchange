"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import Modal from "@Components/Modal/Modal";
import styles from "./publicUrls.module.css";

export default function PublicUrls() {
  const [isDoublePaneOpen, setIsDoublePaneOpen] = useState(false);
  const [isWhishesPaneOpen, setIsWhishesPaneOpen] = useState(false);
  const { data, update: updateSession } = useSession();
  const { doublesPublicUrl, wishesPublicUrl } = data?.user || {};

  const toggleState = (
    state: boolean,
    setter: Dispatch<SetStateAction<boolean>>
  ) => {
    setter(!state);
  };

  const onClickGenerate = (type: "doubles" | "wishes") => {
    const url =
      type === "doubles"
        ? "/api/generate-doubles-public-url"
        : "/api/generate-wishes-public-url";

    fetch(url, { method: "GET" })
      .then(() => updateSession())
      .then(() => {
        // TODO Display Snackbar
      });
  };

  return (
    <Modal buttonContent="URLs Publique">
      <>
        <h2 className={styles.title}>URLs Publique</h2>
        <p className={styles.explain}>
          Vous pouvez partager la liste de vos cartes en double et la liste des
          cartes que vous souhaitez acquérir grâce à des pages web publique. Ces
          pages web ne comprennent aucune de vos informations personnelles. Par
          défaut vous ne disposez pas de ces pages mais vous pouvez les générer
          sur cet écran. Tout le monde a accès à ces pages, les gens savent
          qu&apos;il s&apos;agit de vos doubles ou souhaits uniquement parce que
          c&apos;est vous qui leur fournissez l&apos;URL.
        </p>
        <hr className={styles.hr} />
        <h3
          role="button"
          aria-expanded={isDoublePaneOpen}
          tabIndex={0}
          className={styles.clickableTitle}
          onClick={() => toggleState(isDoublePaneOpen, setIsDoublePaneOpen)}
          onKeyDown={() => toggleState(isDoublePaneOpen, setIsDoublePaneOpen)}
        >
          <span
            className={clsx(
              styles.chevron,
              isDoublePaneOpen && styles.chevronOpen
            )}
          >
            {">"}
          </span>{" "}
          Vos doubles
        </h3>
        <section
          className={clsx(styles.sectionUrl, isDoublePaneOpen && styles.show)}
        >
          {doublesPublicUrl ? (
            <p className={styles.sectionContent}>
              Voici l&apos;adresse publique de vos doubles :{" "}
              <a
                className={styles.publicUrl}
                target="_blank"
                href={`https://www.151-exchange.com/doubles/${doublesPublicUrl}`}
              >{`https://www.151-exchange.com/doubles/${doublesPublicUrl}`}</a>
            </p>
          ) : (
            <p className={styles.sectionContent}>
              Vous n&apos;avez pas encore d&apos;url publique pour vos doubles,{" "}
              <button
                onClick={() => onClickGenerate("doubles")}
                className={styles.generateButton}
              >
                cliquez içi
              </button>{" "}
              pour en générer une.
            </p>
          )}
        </section>
        <hr className={styles.hr} />
        <h3
          role="button"
          aria-expanded={isWhishesPaneOpen}
          tabIndex={0}
          className={styles.clickableTitle}
          onClick={() => toggleState(isWhishesPaneOpen, setIsWhishesPaneOpen)}
          onKeyDown={() => toggleState(isWhishesPaneOpen, setIsWhishesPaneOpen)}
        >
          <span
            className={clsx(
              styles.chevron,
              isWhishesPaneOpen && styles.chevronOpen
            )}
          >
            {">"}
          </span>{" "}
          Vos souhaits
        </h3>
        <section
          className={clsx(styles.sectionUrl, isWhishesPaneOpen && styles.show)}
        >
          {wishesPublicUrl ? (
            <p className={styles.sectionContent}>
              Voici l&apos;adresse publique de vos souhaits :{" "}
              <a
                className={styles.publicUrl}
                target="_blank"
                href={`https://www.151-exchange.com/souhaits/${wishesPublicUrl}`}
              >{`https://www.151-exchange.com/souhaits/${wishesPublicUrl}`}</a>
            </p>
          ) : (
            <p className={styles.sectionContent}>
              Vous n&apos;avez pas encore d&apos;url publique pour vos souhaits,{" "}
              <button
                onClick={() => onClickGenerate("wishes")}
                className={styles.generateButton}
              >
                cliquez içi
              </button>{" "}
              pour en générer une.
            </p>
          )}
        </section>
      </>
    </Modal>
  );
}
