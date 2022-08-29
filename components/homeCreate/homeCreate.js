import styles from "./home.module.css";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

export default function HomeCreate() {
  return (
    <div className={styles.main}>
      <Link href="/create">
        <div className={styles.home_container}>
          <div className={styles.icon_container}>
            <AddIcon />
          </div>
          <h2 className={styles.heading}>create new trip</h2>
        </div>
      </Link>
    </div>
  );
}
