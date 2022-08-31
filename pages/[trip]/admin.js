import styles from "../../styles/admin.module.css";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import InnerMenu from "../../components/innerMenu/innerMenu";
import TripsMenu from "../../components/tripsMenu/tripsMenu";
import { useReducer } from "react";
import { reducer } from "../../components/tripsMenu/reducer";
import { useRouter } from "next/router";
import AdminForm from "../../components/adminForm/adminForm";

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
  { name: "expenditure", id: 3 },
];

const formsOptions = [
  { name: "Activities", id: 1 },
  { name: "Travellers", id: 2 },
  { name: "Expenditure", id: 3 },
];

export default function Admin({ trip }) {
  const [state, dispatch] = useReducer(reducer, {
    type: "activities",
    formType: "activities",
  });
  const router = useRouter();

  return (
    <div className={styles.main_container}>
      <h1>Admin Container</h1>
      <div className={styles.trips_manager}>
        <TripsMenu
          options={options}
          dispatch={dispatch}
          dispatchType="admin_portal"
        />
        <InnerMenu
          dataList={trip[state?.type]}
          type={state.type}
          admin={router.route.substring(8)}
        />
      </div>
      <div className={styles.forms_manager}>
        <h1>Add new data...</h1>
        <TripsMenu
          options={formsOptions}
          dispatch={dispatch}
          dispatchType="admin_form"
        />
        <AdminForm formType={state.formType} />
      </div>
    </div>
  );
}
