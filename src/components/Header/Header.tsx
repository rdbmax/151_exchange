"use client";
import { useSession } from "next-auth/react";

import Login from "@Components/Login/login";
import Button from "@Components/Button/Button";

import styles from "./header.module.css";

type HeaderProps = {
  onStartSelectionMode: VoidFunction;
  isSelectionMode: boolean;
  onValidateDoubles: VoidFunction;
  onStopSelectionMode: VoidFunction;
};

export default function Header({
  onStartSelectionMode,
  isSelectionMode,
  onValidateDoubles,
  onStopSelectionMode,
}: HeaderProps) {
  const { status } = useSession();

  return (
    <header key="header" className={styles.header}>
      <div className={styles.leftSideHeader}>
        <div>
          {status === "authenticated" &&
            (isSelectionMode ? (
              <>
                <Button
                  withBorder
                  onClick={() => {
                    onValidateDoubles();
                  }}
                  className={styles.buttonWithMargin}
                >
                  Valider mes doubles
                </Button>
                <Button
                  withBorder
                  onClick={() => {
                    onStopSelectionMode();
                  }}
                  className={styles.buttonWithMargin}
                >
                  Annuler
                </Button>
              </>
            ) : (
              <Button
                withBorder
                onClick={() => onStartSelectionMode()}
                className={styles.buttonWithMargin}
              >
                Modifier mes doubles
              </Button>
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
