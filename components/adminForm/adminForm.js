import { useReducer } from "react";
import ActForm from "../actForm/actForm";
import TraForm from "../traForm/traForm";
import ExpForm from "../expForm/expForm";
import styles from "./adminForm.module.css";
import { reducer } from "./reducer";
import toast from "react-hot-toast";

export default function AdminForm({ formType }) {
  const [state, dispatch] = useReducer(reducer, {
    activities: { name: "", cost: "" },
    travellers: { name: "", phoneNumber: "", id: "" },
    expenditures: { name: "", cost: "", src: "", waqt: "", date: "" },
  });

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className={styles.main_container}>
      <div>
        {(function () {
          switch (formType) {
            case "Activities":
              return <ActForm state={state} dispatch={dispatch} />;
            case "Travellers":
              return <TraForm state={state} dispatch={dispatch} />;
            case "Expenditure":
              return <ExpForm state={state} dispatch={dispatch} />;
          }
        })()}
      </div>
      <button
        className={styles.btn}
        type="button"
        onClick={(e) => {
          toast.promise(handleSubmit(e), {
            loading: "Processing Request...",
            success: <b>Succesfully Submitted</b>,
            error: <b>Unknown Error Occurred</b>,
          });
        }}
      >
        Submit
      </button>
    </form>
  );
}
