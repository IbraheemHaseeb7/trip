import styles from "./actForm.module.css";
import toast from "react-hot-toast";

export default function ActForm({ state, dispatch, id, trip }) {
  const inputs = [
    { name: "name", value: state?.activities?.name, id: 1 },
    { name: "cost", value: state?.activities?.cost, id: 2 },
  ];

  function handleChange(e) {
    dispatch({
      type: "activities",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "activities_submit" });
  }

  console.log(trip);

  return (
    <div className={styles.main_container}>
      {inputs.map(({ name, value, id }) => {
        return (
          <input
            name={name}
            type="name"
            value={value}
            key={id}
            placeholder={name}
            onChange={handleChange}
          />
        );
      })}
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
    </div>
  );
}
