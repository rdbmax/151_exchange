"use client";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import { signIn, useSession, signOut } from "next-auth/react";
import { GoogleLoginButton } from "react-social-login-buttons";

import styles from "./login.module.css";

const genericAvatar =
  "https://www.shareicon.net/data/512x512/2016/08/05/807323_gaming_512x512.png";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Dropdown>
        <MenuButton
          className={styles.avatarButton}
          // @ts-ignore
          style={{
            backgroundImage: `url(${session?.user?.image || genericAvatar})`,
          }}
        />
        <Menu className={styles.avatarMenu}>
          <MenuItem className={styles.avatarMenuItem} onClick={() => signOut()}>
            Déconnexion
          </MenuItem>
        </Menu>
      </Dropdown>
    );
  }

  if (status === "unauthenticated") {
    return (
      <GoogleLoginButton
        className={styles.googleButton}
        onClick={() => signIn("google")}
      />
    );
  }

  return null;
}
