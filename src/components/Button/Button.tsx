import { HTMLAttributes, MouseEventHandler } from "react";
import clsx from "clsx";

import styles from "./button.module.css";

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  withBorder?: Boolean;
  children: string;
  active?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export default function Button({
  active = false,
  onClick,
  withBorder = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={clsx(
        styles.button,
        withBorder ? styles.withBorder : styles.withoutBorder,
        active && styles.isActive,
        className
      )}
    >
      {children}
    </button>
  );
}
