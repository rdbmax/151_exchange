"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export type CardsSelection = {
  userCards: string[];
  userCardsSelection: string[];
  onCheckCard: (id: string) => void;
  onValidateSelection: VoidFunction;
  onStartSelectionMode: VoidFunction;
  onStopSelectionMode: VoidFunction;
  isSelectionMode: boolean;
};

type UseCardsSelection = (params: {
  dataSet?: "cardsOwned" | "desiredCards";
  isPublicView?: boolean;
}) => CardsSelection;

const useCardsSelection: UseCardsSelection = function useCardsListFilters({
  dataSet = "cardsOwned",
  isPublicView = false,
}) {
  const { data: session, update: updateSession } = useSession();
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [userCardsSelection, setCardsOwnedSelection] = useState<string[]>(
    session?.user?.[dataSet] || []
  );

  if (isPublicView || !session) {
    return {
      userCards: [],
      userCardsSelection: [],
      onCheckCard: () => {},
      onValidateSelection: () => {},
      onStartSelectionMode: () => {},
      onStopSelectionMode: () => {},
      isSelectionMode,
    };
  }

  const onCheckCard = (id: string) => {
    if (userCardsSelection.includes(id)) {
      setCardsOwnedSelection(
        userCardsSelection.filter((selectedCard) => selectedCard !== id)
      );
    } else {
      setCardsOwnedSelection([...userCardsSelection, id]);
    }
  };

  const onValidateSelection = () => {
    const type = dataSet === "desiredCards" ? "wishes" : "doubles";
    fetch("/api/validate-selection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, list: userCardsSelection }),
    })
      .then(() => updateSession())
      .then(() => {
        setIsSelectionMode(false);
        onSyncSelectionWithSession();
        // TODO Display Snackbar
      });
  };

  const onStartSelectionMode = () => {
    onSyncSelectionWithSession();
    setIsSelectionMode(true);
  };

  const onSyncSelectionWithSession = () => {
    setIsSelectionMode(false);
    setCardsOwnedSelection(session.user[dataSet]);
  };

  const onStopSelectionMode = () => {
    onSyncSelectionWithSession();
  };

  return {
    userCards: session.user[dataSet],
    userCardsSelection,
    onCheckCard,
    onValidateSelection,
    onStartSelectionMode,
    onStopSelectionMode,
    isSelectionMode,
  };
};

export default useCardsSelection;
