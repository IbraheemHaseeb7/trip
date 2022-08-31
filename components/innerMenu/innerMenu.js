import { useState } from "react";
import Popup from "../popup/popup";
import styles from "./inner.module.css";

export default function InnerMenu({ dataList, type, admin }) {
  return (
    <>
      {type !== "expenditure" ? (
        <div className={styles.main_container}>
          {dataList?.map(({ name, id, cost, phoneNumber }) => {
            return (
              <div key={id}>
                <h2>{name}</h2>
                {admin === "admin" ? (
                  <button className={styles.btn} type="button">
                    Delete
                  </button>
                ) : cost !== undefined ? (
                  <p>Rs: {cost}</p>
                ) : (
                  <p>0{phoneNumber}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <Expenditure dataList={dataList} />
      )}
    </>
  );
}

function Expenditure({ dataList }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    cost: 0,
    waqt: "",
    date: "",
    src: "",
  });

  return (
    <>
      <div
        className={`${styles.main_container} ${styles.expenditure_container}`}
      >
        {dataList?.map(({ name, id, cost, phoneNumber }) => {
          return (
            <div
              key={id}
              onClick={(event) => {
                setOpen(!open);
                const array = expenses?.filter((e) => {
                  return e.id == event.target.title;
                });
                setData({
                  name: array[0].name,
                  cost: array[0].cost,
                  waqt: array[0].waqt,
                  date: array[0].date,
                  src: array[0].src,
                });
              }}
              title={id}
            >
              <h2>{name}</h2>
              {cost !== undefined ? <p>Rs: {cost}</p> : <p>0{phoneNumber}</p>}
            </div>
          );
        })}
      </div>
      {open && (
        <Popup
          name={data.name}
          cost={data.cost}
          waqt={data.waqt}
          date={data.date}
          src={data.src}
          setOpen={setOpen}
          open={open}
        />
      )}
    </>
  );
}
