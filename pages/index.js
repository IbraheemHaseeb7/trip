import HomeCreate from "../components/homeCreate/homeCreate";
import TripsList from "../components/trips/trips";
import styles from "../styles/Home.module.css";
import TripsMenu from "../components/tripsMenu/tripsMenu";
import { useReducer } from "react";
import { reducer } from "../components/tripsMenu/reducer";

const options = [
  { name: "planning", id: 1 },
  { name: "inprogress", id: 2 },
  { name: "completed", id: 3 },
];

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { status: "planning" });
  return (
    <div className={styles.container}>
      <HomeCreate />
      <TripsMenu
        dispatchType={"trip_menu"}
        dispatch={dispatch}
        options={options}
      />
      <TripsList state={state} trip_status={state.status} />
    </div>
  );
}
