import styles from "./mainForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function Acitivity({ dispatch }) {
  const [activity, setAcitivity] = useState(false);
  const [name, setName] = useState({ name: "", cost: 0 });

  function createNewActivity() {
    setAcitivity(!activity);
  }

  function handleName(e) {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    const id = new Date().getTime().toString();

    dispatch({ type: "activity", payload: { value: name, id: id } });

    setName({ name: "", cost: "" });
    setAcitivity(!activity);
  }

  return (
    <form className={styles.activity_container}>
      <h2 className={styles.sub}>activities</h2>
      <button type="button" onClick={createNewActivity} className="btn">
        <AddIcon />
        Create new Activity
      </button>
      {activity && (
        <>
          <input
            type="name"
            value={name.name}
            onChange={handleName}
            className="input"
            name="name"
            placeholder="Acitivity Name"
          />
          <input
            type="number"
            value={name.cost}
            onChange={handleName}
            className="input"
            name="cost"
            placeholder="Acitivity Cost"
          />
          <button type="button" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </form>
  );
}
