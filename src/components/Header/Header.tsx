import { getServerSession } from "next-auth/next";

import Login from "../Login/login";
import { authOptions } from "../../utils/authOptions";

import styles from "./header.module.css";

export default async function Header() {
  const session = await getServerSession(authOptions);

  if (process.env.NODE_ENV === "development") {
    console.log({ session });
  }

  return (
    <header key="header" className={styles.header}>
      <div className={styles.leftSideHeader}>
        <div />
        <h1 className={styles.title}>151_Exchange</h1>
      </div>

      <div className={styles.rightSideHeader}>
        <Login />
      </div>
    </header>
  );
}
