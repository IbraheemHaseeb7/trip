import styles from "./inner.module.css";

export default function InnerMenu({ dataList }) {
  return (
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
  );
}
