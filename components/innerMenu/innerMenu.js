import { useState } from "react";
import Popup from "../popup/popup";
import styles from "./inner.module.css";

export default function InnerMenu({ dataList, type }) {
  return (
    <>
      {type !== "expenditure" ? (
        <div className={styles.main_container}>
          {dataList?.map(({ name, id, cost, phoneNumber }) => {
            return (
              <div key={id}>
                <h2>{name}</h2>
                {cost !== undefined ? <p>Rs: {cost}</p> : <p>0{phoneNumber}</p>}
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

const expenses = [
  {
    name: "eating",
    src: "",
    id: 1,
    cost: 10000,
    waqt: "1300",
    date: "16 March, 2022",
  },
];

function Expenditure({ dataList }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`${styles.main_container} ${styles.expenditure_container}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {expenses?.map(({ name, id, cost, phoneNumber }) => {
          return (
            <div key={id}>
              <h2>{name}</h2>
              {cost !== undefined ? <p>Rs: {cost}</p> : <p>0{phoneNumber}</p>}
            </div>
          );
        })}
      </div>
      {open && (
        <Popup
          name={"Eating"}
          cost={10000}
          waqt={"1300"}
          date={"16 March, 2022"}
        />
      )}
    </>
  );
}
