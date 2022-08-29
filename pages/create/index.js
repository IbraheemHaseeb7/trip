import MainForm from "../../components/forms/mainForm";
import styles from "./index.module.css";

export default function Create() {
  return (
    <div className={styles.create_container}>
      <div className={styles.sub_container}>
        <h1 className={styles.heading}>create new trip</h1>
        <MainForm />
      </div>
    </div>
  );
}
