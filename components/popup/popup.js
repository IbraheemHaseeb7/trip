import styles from "./popup.module.css";

export default function Popup({ name, cost, waqt, date, src }) {
  return (
    <>
      <div className={styles.main_container}>
        <h1>{name}</h1>
        <div className={styles.data_container}>
          <p>Cost: </p>
          <span>{cost}</span>
          <p>Time: </p>
          <span>{waqt}</span>
          <p>Date: </p>
          <span>{date}</span>
        </div>
        <div className={styles.proof_container}>
          {src !== undefined ? (
            <img src={src} alt={name} />
          ) : (
            <p>No proof available for this expenditure</p>
          )}
        </div>
      </div>
      <div className={styles.shadow}></div>
    </>
  );
}
