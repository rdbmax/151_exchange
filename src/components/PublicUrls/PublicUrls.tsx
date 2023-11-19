"use client";
import { useSession } from "next-auth/react";

import Modal from "@Components/Modal/Modal";
import styles from "./publicUrls.module.css";

export default function PublicUrls() {
  const { data, update: updateSession } = useSession();
  const doubles_public_url = data?.user.doubles_public_url;

  const onClickGenerate = () => {
    console.log("generate");
    fetch("/api/generate-doubles-public-url", {
      method: "GET",
    })
      .then(() => updateSession())
      .then(() => {
        // TODO Display Snackbar
      });
  };

  return (
    <Modal buttonContent="URL Publique">
      <>
        <h2 className={styles.title}>URL Publique</h2>
        {doubles_public_url ? (
          <>
            <p>
              Voici l&apos;adresse publique de vos doubles :{" "}
              <a
                className={styles.publicUrl}
                href={`https://www.151-exchange.com/doubles/${doubles_public_url}`}
              >{`https://www.151-exchange.com/doubles/${doubles_public_url}`}</a>
            </p>
            <p>
              Vos informations personnelles tel que vos nom/prénom
              n&apos;apparaissent pas sur cette page.
            </p>
            <p>
              Vous pouvez la partager avec vos amis ou avec les personnes qui
              souhaitent vous échanger des cartes.
            </p>
          </>
        ) : (
          <>
            <p>
              Vous n&apos;avez pas encore d&apos;url publique pour vos doubles,{" "}
              <button
                onClick={onClickGenerate}
                className={styles.generateButton}
              >
                cliquez içi
              </button>{" "}
              pour en générer une.
            </p>
            <p>
              Vos informations personnelles tel que vos nom/prénom
              n&apos;apparaitront pas sur cette page.
            </p>
          </>
        )}
      </>
    </Modal>
  );
}
