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

type UseCardsSelection = (params?: {}) => CardsSelection;

const useCardsSelection: UseCardsSelection = function useCardsListFilters() {
  const { data: session, update: updateSession } = useSession();
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [userCardsSelection, setCardsOwnedSelection] = useState<string[]>(
    session?.user?.cardsOwned || []
  );

  if (!session) {
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
    fetch("/api/validate-selection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCardsSelection),
    })
      .then(() => updateSession())
      .then(() => {
        setIsSelectionMode(false)
        onSyncSelectionWithSession()
        // TODO Display Snackbar
      });
  };

  const onStartSelectionMode = () => {
    console.log('onStartSelectionMode')
    onSyncSelectionWithSession()
    setIsSelectionMode(true)
  }
  
  const onSyncSelectionWithSession = () => {
    console.log('onSyncSelectionWithSession')
    setIsSelectionMode(false)
    setCardsOwnedSelection(session.user.cardsOwned);
  };

  const onStopSelectionMode = () => {
    onSyncSelectionWithSession()
  }

  return {
    userCards: session.user.cardsOwned,
    userCardsSelection,
    onCheckCard,
    onValidateSelection,
    onStartSelectionMode,
    onStopSelectionMode,
    isSelectionMode,
  };
};

export default useCardsSelection;
