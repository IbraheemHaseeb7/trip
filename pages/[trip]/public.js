import styles from "../../styles/public.module.css";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../libraries/firebase";
import { useContext, useReducer, useState } from "react";
import { reducer } from "../../components/tripsMenu/reducer";
import TripsMenu from "../../components/tripsMenu/tripsMenu";
import InnerMenu from "../../components/innerMenu/innerMenu";
import { AuthProvider } from "../_app";
import toast from "react-hot-toast";
import Link from "next/link";

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

  const { sign, signIn } = useContext(AuthProvider);
  const [state, dispatch] = useReducer(reducer, {
    inner: "activities",
    open: false,
  });

  trip?.activities?.forEach((value) => {
    sum = sum + value.cost;
  });

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
        {}
        <InnerMenu dataList={trip[state?.inner]} type={state?.inner} />
      </div>
      <div className={styles.buttons_container}>
        <Link href={`/${trip.id}/admin`}>
          <button type="button" className={styles.btn}>
            Admin Portal
          </button>
        </Link>
        <button
          type="button"
          className={styles.btn}
          onClick={() => {
            if (!sign) return toast.error("Please sign in first!");
            dispatch({ type: "open" });
          }}
        >
          Apply for Admin
        </button>
      </div>
      {state.open && (
        <>
          <AdminApplication trip={trip} />
          <div
            className={styles.application_shadow}
            onClick={() => {
              dispatch({ type: "open" });
            }}
          ></div>
        </>
      )}
    </div>
  );
}

function AdminApplication({ trip }) {
  const [value, setValue] = useState({ name: "", uid: "" });
  const [allow, setAllow] = useState(false);

  function handleChange(e) {
    setValue({ name: e.target.value, uid: auth.currentUser?.uid });
  }

  return (
    <form className={styles.admin_form}>
      <h2>Send Your Application for...</h2>
      {trip?.travellers?.map(({ name, id }) => {
        return (
          <div key={id}>
            <input
              id={id}
              className={styles.input}
              type="radio"
              value={name}
              name="admins"
              onChange={handleChange}
            />
            <label htmlFor={id}>{name}</label>
          </div>
        );
      })}
      <button
        type="button"
        className={styles.apply_btn}
        disabled={allow}
        onClick={async (e) => {
          e.preventDefault();
          if (value.name === "")
            return toast.error("Please select an option first");

          const arrayOfExistance = trip.adminApplicants?.filter((e) => {
            return e.uid === auth.currentUser?.uid;
          });
          const adminsArray = trip.adminApplicants;

          if (arrayOfExistance?.length === 1)
            return toast.error("You have already submitted your request");
          adminsArray?.push(value);
          const body = {
            id: trip.id,
            adminsArray: adminsArray,
          };
          const final = JSON.stringify(body);
          toast.promise(
            (async function () {
              await fetch("/api/sendApplication", {
                method: "PUT",
                body: final,
              });
            })(),
            {
              loading: "Processing your request...",
              success: "Successfully sent request!",
              error: "Unknown error occurred",
            }
          );
          setAllow(true);
        }}
      >
        Apply
      </button>
    </form>
  );
}
