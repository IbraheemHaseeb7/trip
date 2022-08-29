import styles from "./mainForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function Travellers({ dispatch }) {
  const [traveller, setTraveller] = useState(false);
  const [name, setName] = useState({ name: "", phoneNumber: 0 });

  function createNewTraveller() {
    setTraveller(!traveller);
  }

  function handleName(e) {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    const id = new Date().getTime().toString();

    dispatch({ type: "traveller", payload: { value: name, id: id } });

    setName({ name: "", phoneNumber: "" });
    setTraveller(!traveller);
  }

  return (
    <form className={styles.traveller_container}>
      <button type="button" onClick={createNewTraveller} className="btn">
        <AddIcon />
        Add new traveller
      </button>
      {traveller && (
        <>
          <input
            type="name"
            value={name.name}
            onChange={handleName}
            className="input"
            name="name"
            placeholder="Traveller Name"
          />
          <input
            type="number"
            value={name.cost}
            onChange={handleName}
            className="input"
            name="phoneNumber"
            placeholder="Traveller Phone Number"
          />
          <button type="button" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </form>
  );
}
