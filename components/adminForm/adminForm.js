import { useReducer } from "react";
import styles from "./adminForm.module.css";
import { reducer } from "./reducer";

export default function AdminForm({ formType }) {
  const [state, dispatch] = useReducer(reducer, { type: formType });

  function handleOptions(e) {}

  return <form className={styles.main_container}></form>;
}
