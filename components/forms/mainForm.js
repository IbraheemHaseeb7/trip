import styles from "./mainForm.module.css";
import { useReducer } from "react";
import { reducer } from "./reducer";
import Travelling from "./travelling";
import Acitivity from "./activity";
import SeeAcitivites from "../see/activities";
import Travellers from "./travellers";
import SeeTravellers from "../see/travellers";
import Stats from "../see/stats";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Status from "./status";

export default function MainForm() {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    destination: "",
    date: "",
    travelling: {
      departure: 0,
      arrival: 0,
    },
    activities: [],
    travellers: [],
    status: "",
    superAdmin: "eFyTIs9ADMVyCSesZzSU62FfSj02",
    admins: [],
  });
  const [response, setResponse] = useState("");

  function handleChange(e) {
    dispatch({
      type: "typing",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const id = new Date().getTime().toString();
    const data = { ...state };
    const idObj = { id: id };

    const final = Object.assign(data, idObj);
    const json = JSON.stringify(final);

    await fetch("/api/create", {
      method: "PUT",
      body: json,
    }).then((res) => {
      res
        .json()
        .then((res) => {
          setResponse(res.res);
        })
        .catch((err) => {
          setResponse(err.res);
        });
    });

    dispatch({ type: "submit" });
  }

  const inputs = [
    {
      name: "name",
      value: state.name,
      placeholder: "Name",
      classn: "input",
      type: "name",
      id: 1,
    },
    {
      name: "date",
      value: state.date,
      placeholder: "Date",
      classn: "input",
      type: "date",
      id: 2,
    },
    {
      name: "destination",
      value: state.destination,
      placeholder: "Destination",
      classn: "input",
      type: "name",
      id: 3,
    },
  ];

  return (
    <>
      <form className={styles.form_container}>
        {inputs.map(({ name, value, type, classn, placeholder, id }) => {
          return (
            <input
              key={id}
              name={name}
              value={value}
              type={type}
              className={classn}
              placeholder={placeholder}
              onChange={handleChange}
            />
          );
        })}
      </form>
      <h1 className={styles.heading}>estimated cost</h1>
      <Travelling state={state} handleChange={handleChange} />
      <Acitivity dispatch={dispatch} />
      <SeeAcitivites state={state} dispatch={dispatch} />
      <h1 className={styles.heading}>travellers</h1>
      <Travellers dispatch={dispatch} />
      <SeeTravellers state={state} dispatch={dispatch} />
      <h1 className={styles.heading}>status</h1>
      <Status state={state} dispatch={dispatch} />
      <Stats state={state} />
      <button
        type="button"
        className="btn"
        onClick={(e) => {
          toast.promise(handleSubmit(e), {
            loading: "Sending Request...",
            success: <p>{response}</p>,
            error: <p>{response}</p>,
          });
        }}
      >
        Submit
      </button>
    </>
  );
}
