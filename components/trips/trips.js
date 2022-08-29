import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./trips.module.css";

export default function TripsList({ trip_status }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    const stat = { status: trip_status };
    const final = JSON.stringify(stat);

    fetch(`/api/getTrips`, {
      method: "PUT",
      body: final,
    }).then((res) => {
      res.json().then((res) => {
        setData(res.data);
      });
    });
  }, [trip_status]);

  return (
    <div className={styles.main_container}>
      <div className={styles.trips_container}>
        {data?.map(({ name, id }) => {
          return (
            <div
              className={styles.trip}
              key={id}
              onClick={() => {
                router.push(`/${id}/public`);
              }}
            >
              <h3>{name}</h3>
              <span className={styles[trip_status]}>{trip_status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
