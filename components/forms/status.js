import styles from "./mainForm.module.css";

const inputs = [
  { value: "planning", id: 1 },
  { value: "inprogress", id: 2 },
  { value: "completed", id: 3 },
];

export default function Status({ state, dispatch }) {
  function handleChange(e) {
    dispatch({ type: "status", payload: e.target.value });
  }

  return (
    <form className={styles.status_container}>
      {inputs.map(({ value, id }) => {
        return (
          <div key={id}>
            <input
              key={id}
              type="radio"
              name="status"
              onChange={handleChange}
              className={styles.status_radio}
              value={value}
              id={value}
            />
            <label htmlFor={value}>{value}</label>
          </div>
        );
      })}
    </form>
  );
}
