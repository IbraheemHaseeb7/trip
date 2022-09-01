import styles from "./traForm.module.css";
import toast from "react-hot-toast";

export default function ActForm({ state, dispatch, id, trip }) {
  const inputs = [
    { name: "name", value: state?.travellers?.name, id: 1, type: "name" },
    {
      name: "phoneNumber",
      value: state?.travellers?.phoneNumber,
      id: 2,
      type: "number",
    },
  ];

  function handleChange(e) {
    dispatch({
      type: "travellers",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const activityId = { id: new Date().getTime().toString() };
    const finalResult = Object.assign(state.travellers, activityId);

    trip.travellers.push(finalResult);
    const body = {
      id: id,
      type: "travellers",
      data: trip.travellers,
    };

    const final = JSON.stringify(body);

    await fetch("/api/adminForm", {
      method: "PUT",
      body: final,
    });
    dispatch({ type: "travellers_submit" });
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
