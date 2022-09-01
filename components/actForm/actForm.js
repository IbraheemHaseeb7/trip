import styles from "./actForm.module.css";
import toast from "react-hot-toast";

export default function ActForm({ state, dispatch, id, trip }) {
  const inputs = [
    { name: "name", value: state?.activities?.name, id: 1, type: "name" },
    { name: "cost", value: state?.activities?.cost, id: 2, type: "number" },
  ];

  function handleChange(e) {
    dispatch({
      type: "activities",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const activityId = { id: new Date().getTime().toString() };
    const finalResult = Object.assign(state.activities, activityId);

    trip.activities.push(finalResult);
    const body = {
      id: id,
      type: "activities",
      data: trip.activities,
    };

    const final = JSON.stringify(body);

    await fetch("/api/adminForm", {
      method: "PUT",
      body: final,
    });
    dispatch({ type: "activities_submit" });
  }

  return (
    <div className={styles.main_container}>
      {inputs.map(({ name, value, id, type }) => {
        return (
          <input
            name={name}
            type={type}
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
