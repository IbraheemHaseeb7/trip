import styles from "./mainForm.module.css";

export default function Travelling({ state, handleChange }) {
  return (
    <>
      <h2 className={styles.sub}>travelling</h2>
      <form className={styles.travelling_container}>
        <input
          name="departure"
          value={state.travelling.departure}
          type="number"
          placeholder="Departure"
          className="input"
          onChange={handleChange}
        />
        <input
          name="arrival"
          value={state.travelling.arrival}
          type="number"
          placeholder="Arrival"
          className="input"
          onChange={handleChange}
        />
      </form>
    </>
  );
}
