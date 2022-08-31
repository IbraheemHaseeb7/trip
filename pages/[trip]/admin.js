import styles from "../../styles/admin.module.css";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";
import Expenditure from "../../components/expenditure/expenditure";
import TripsMenu from "../../components/tripsMenu/tripsMenu";

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
  { name: "acitivities", id: 1 },
  { name: "travellers", id: 2 },
  { name: "expenditure", id: 3 },
];

export default function Admin({ trip }) {
  return (
    <div className={styles.admin_container}>
      <h1>Admin Container</h1>
      <TripsMenu options={options} />
      <Expenditure />
    </div>
  );
}
