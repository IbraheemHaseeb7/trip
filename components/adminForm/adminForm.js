import { useReducer } from "react";
import ActForm from "../actForm/actForm";
import TraForm from "../traForm/traForm";
import ExpForm from "../expForm/expForm";
import styles from "./adminForm.module.css";
import { reducer } from "./reducer";
import { useRouter } from "next/router";

export default function AdminForm({ formType, trip }) {
  const [state, dispatch] = useReducer(reducer, {});
  const router = useRouter();
  return (
    <form className={styles.main_container}>
      {(function () {
        switch (formType) {
          case "Activities":
            return (
              <ActForm
                state={state}
                dispatch={dispatch}
                id={router.query.trip}
                trip={trip}
              />
            );
          case "Travellers":
            return (
              <TraForm
                state={state}
                dispatch={dispatch}
                id={router.query.trip}
                trip={trip}
              />
            );
          case "Expenditure":
            return (
              <ExpForm
                state={state}
                dispatch={dispatch}
                id={router.query.trip}
                trip={trip}
              />
            );
        }
      })()}
    </form>
  );
}
