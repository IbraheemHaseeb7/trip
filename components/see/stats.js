import styles from "./styles.module.css";

export default function Stats({ state }) {
  let cost = 0;

  for (let counter = 0; counter < state.activities.length; counter++) {
    cost = cost + state.activities[counter].cost;
  }
  const total_cost =
    state.travelling.departure + state.travelling.arrival + cost;

  return (
    <div className={styles.stats_container}>
      <h1 className={styles.heading}>final evaluation</h1>
      <div className={styles.sub_container}>
        <div>
          <h3>Total Estimated Cost: </h3>
          <h3>Rs.{total_cost}</h3>
        </div>
        <div>
          <h3>Total Travellers: </h3>
          <h3>{state.travellers.length}</h3>
        </div>
        <div>
          <h3>Per Head: </h3>
          <h3>Rs.{total_cost / state.travellers.length}</h3>
        </div>
      </div>
    </div>
  );
}
