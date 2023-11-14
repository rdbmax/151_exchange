import styles from "./page.module.css";
import { all_cards_flat } from "../db/all_cards";
import Cards from "../components/Cards";
import RoadMap from "../components/RoadMap";

export default function Home() {
  return [
    <header key="header" className={styles.header}>
      <div className={styles.leftSideHeader}>
        <RoadMap />
        <h1 className={styles.title}>151_Exchange</h1>
      </div>
    </header>,
    <main key="main" className={styles.main}>
      <Cards allCards={all_cards_flat} />
    </main>,
  ];
}
