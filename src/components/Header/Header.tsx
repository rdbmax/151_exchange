"use client";
import { useSession } from "next-auth/react";

import Login from "@Components/Login/login";
import Button from "@Components/Button/Button";
import { type CardsSelection } from "@Hooks/useCardsSelection";

import styles from "./header.module.css";

type HeaderProps = {
  doublesSelection: CardsSelection;
  wishesSelection: CardsSelection;
};

export default function Header({
  doublesSelection,
  wishesSelection,
}: HeaderProps) {
  const { status, data } = useSession();

  const {
    onValidateSelection: validateDoublesSelection,
    onStartSelectionMode: startDoublesSelection,
    onStopSelectionMode: stopDoublesSelection,
    isSelectionMode: isDoublesSelectionMode,
  } = doublesSelection;

  const {
    onValidateSelection: validateWishesSelection,
    onStartSelectionMode: startWishesSelection,
    onStopSelectionMode: stopWishesSelection,
    isSelectionMode: isWishesSelectionMode,
  } = wishesSelection;

  const onStartWishesSelection = () => {
    stopDoublesSelection();
    startWishesSelection();
  };
  const onStartDoublesSelection = () => {
    stopWishesSelection();
    startDoublesSelection();
  };

  return (
    <header key="header" className={styles.header}>
      <div className={styles.leftSideHeader}>
        <div>
          {status === "authenticated" &&
            (isDoublesSelectionMode || isWishesSelectionMode ? (
              <>
                <Button
                  withBorder
                  onClick={() => {
                    if (isDoublesSelectionMode) validateDoublesSelection();
                    if (isWishesSelectionMode) validateWishesSelection();
                  }}
                  className={styles.buttonWithMargin}
                >
                  {`Valider mes ${
                    isDoublesSelectionMode ? "doubles" : "souhaits"
                  }`}
                </Button>
                <Button
                  withBorder
                  onClick={() => {
                    if (isDoublesSelectionMode) stopDoublesSelection();
                    if (isWishesSelectionMode) stopWishesSelection();
                  }}
                  className={styles.buttonWithMargin}
                >
                  Annuler
                </Button>
              </>
            ) : (
              <>
                <Button
                  withBorder
                  onClick={onStartDoublesSelection}
                  className={styles.buttonWithMargin}
                >
                  Modifier mes doubles
                </Button>
                <Button
                  withBorder
                  onClick={onStartWishesSelection}
                  className={styles.buttonWithMargin}
                >
                  Modifier mes souhaits
                </Button>
              </>
            ))}
        </div>
        <h1 className={styles.title}>151_Exchange</h1>
      </div>

      <div className={styles.rightSideHeader}>
        <Login />
      </div>
    </header>
  );
}
