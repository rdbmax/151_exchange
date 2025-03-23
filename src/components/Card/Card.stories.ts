import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Rarity, Type } from "../../db/all_cards";
import Card from "./Card";

const meta = {
  title: "Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    card: {
      id: "4",
      type: Type.normal,
      name: "Salamèche",
      rarity: Rarity.commune,
      hasReverseVersion: true,
    },
    index: 3,
    onCheckCard: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Salameche: Story = {
  args: {
    hasOwningIcons: false,
    hasCard: false,
    hasReverseCard: false,
    isSelectionMode: false,
    hasCardAsSelection: false,
    hasReverseCardAsSelection: false,
  },
};

export const SalamecheOwnAll: Story = {
  args: {
    hasOwningIcons: true,
    hasCard: true,
    hasReverseCard: true,
    isSelectionMode: false,
    hasCardAsSelection: false,
    hasReverseCardAsSelection: false,
  },
};

export const SalamecheSelecting: Story = {
  args: {
    hasOwningIcons: false,
    hasCard: false,
    hasReverseCard: false,
    isSelectionMode: true,
    hasCardAsSelection: true,
    hasReverseCardAsSelection: false,
  },
};
