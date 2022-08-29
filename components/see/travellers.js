import styles from "./styles.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SeeTravellers({ state, dispatch }) {
  function deleteIt(e) {
    e.preventDefault();

    dispatch({ type: "delete_traveller", payload: e.target.value });
  }

  let counter = 0;

  return (
    <div className={styles.travellers_container}>
      {state.travellers.map(({ name, phoneNumber, id }) => {
        counter++;
        return (
          <div className={styles.one_traveller} key={id}>
            <h3>
              {counter}. {name}
            </h3>
            <h3>{phoneNumber}</h3>
            <button className="btn" onClick={deleteIt} value={id}>
              <DeleteIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
