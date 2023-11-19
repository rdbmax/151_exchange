"use client";
import { forwardRef, useState } from "react";
import { Modal as BaseModal } from "@mui/base/Modal";

import Button from "@Components/Button/Button";
import styles from "./modale.module.css";

const Backdrop = forwardRef<HTMLDivElement, { open?: boolean }>(
  (props, ref) => {
    // @ts-ignore https://github.com/mui/material-ui/issues/32882
    const { open, ownerState, ...other } = props;
    return <div ref={ref} {...other} className={styles.backdrop} />;
  }
);
Backdrop.displayName = "Backdrop";

type ModalProps = {
  children: JSX.Element;
  buttonContent: string;
};

export default function Modal({
  buttonContent,
  children: modalContent,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return [
    <Button key="triggerButton" onClick={() => setIsOpen(true)} active={isOpen}>
      {buttonContent}
    </Button>,
    <BaseModal
      key="modal"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={styles.modal}
      slots={{ backdrop: Backdrop }}
    >
      <div className={styles.modalContent}>{modalContent}</div>
    </BaseModal>,
  ];
}
