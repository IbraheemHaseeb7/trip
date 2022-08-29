import styles from "../../styles/public.module.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import { useReducer } from "react";
import { reducer } from "../../components/tripsMenu/reducer";
import TripsMenu from "../../components/tripsMenu/tripsMenu";
import TripsList from "../../components/trips/trips";
import InnerMenu from "../../components/innerMenu/innerMenu";

export async function getStaticProps(route) {
  let trip = [];

  await getDoc(doc(firestore, `trips`, route.params.trip)).then((res) => {
    trip = res.data();
  });

  return {
    props: {
      trip: trip,
      revalidate: 1000,
    },
  };
}

export async function getStaticPaths() {
  let paths = [];
  await getDocs(collection(firestore, `trips`)).then((res) => {
    paths = res.docs.map((res) => {
      const { id } = res.data();
      return { params: { trip: id } };
    });
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}

const options = [
  { name: "activities", id: 1 },
  { name: "travellers", id: 2 },
  { name: "admins", id: 3 },
  { name: "expenditure", id: 4 },
];

export default function Public({ trip }) {
  let sum = 0;

  trip?.activities?.forEach((value) => {
    sum = sum + value.cost;
  });

  const [state, dispatch] = useReducer(reducer, { inner: "activities" });

  return (
    <div className={styles.main_container}>
      <h1>{trip?.name}</h1>
      <div className={styles.brief_intro}>
        <p>
          Destination: <span>{trip?.destination}</span>
        </p>
        <p>
          Date: <span>{trip?.date}</span>
        </p>
        <p>
          Expected Departure: <span>{trip?.travelling?.departure}</span>
        </p>
        <p>
          Expected Arrival: <span>{trip?.travelling?.arrival}</span>
        </p>
        <p>
          Status: <span>{trip?.status}</span>
        </p>
        <p>
          Per Head Cost: <span>{sum / trip?.travellers.length}</span>
        </p>
      </div>
      <div className={styles.bottom_container}>
        <TripsMenu
          dispatchType={"inner_menu"}
          dispatch={dispatch}
          options={options}
        />
        <InnerMenu dataList={trip[state?.inner]} />
      </div>
    </div>
  );
}
