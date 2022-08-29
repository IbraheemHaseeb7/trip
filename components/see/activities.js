import styles from "./styles.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SeeAcitivites({ state, dispatch }) {
  function deleteIt(e) {
    e.preventDefault();

    dispatch({ type: "delete_activity", payload: e.target.value });
  }

  let counter = 0;

  return (
    <div className={styles.activities_container}>
      {state.activities.map(({ name, cost, id }) => {
        counter++;
        return (
          <div className={styles.one_activity} key={id}>
            <h3>
              {counter}. {name}
            </h3>
            <h3>{cost}</h3>
            <button className="btn" onClick={deleteIt} value={id}>
              <DeleteIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
