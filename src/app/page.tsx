import styles from "./page.module.css";
import { all_cards_flat } from "../db/all_cards";
import Cards from "../components/Cards";

export default function Home() {
  return [
    <header className={styles.header}>
      <h1 className={styles.title}>151_Exchange</h1>
    </header>,
    <main className={styles.main}>
      <Cards allCards={all_cards_flat} />
    </main>,
  ];
}
