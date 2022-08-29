import styles from "./tripsMenu.module.css";

export default function TripsMenu({ dispatchType, options, dispatch }) {
  function handleChange(e) {
    e.preventDefault();

    const button = e.target;
    for (
      let counter = 0;
      counter < button.parentElement.childNodes.length;
      counter++
    ) {
      button.parentElement.childNodes[counter].setAttribute(
        "style",
        "background-color: #eaeaea"
      );
    }
    button.setAttribute("style", "background-color: #d9d9d9");

    dispatch({ type: dispatchType, payload: e.target.value });
  }

  return (
    <div className={styles.main_container}>
      <div>
        {options.map(({ name, id }) => {
          return (
            <button
              className={styles.btn}
              type="button"
              value={name}
              key={id}
              onClick={handleChange}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
