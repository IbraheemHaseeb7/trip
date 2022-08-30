import { useState } from "react";
import styles from "./popup.module.css";

export default function Popup({ name, cost, waqt, date, src, setOpen, open }) {
  const [img, setImg] = useState(false);

  return (
    <>
      <div className={styles.main_container}>
        <h1>{name}</h1>
        <div className={styles.data_container}>
          <p>
            Cost:
            <span> {cost}</span>
          </p>
          <p>
            Time:
            <span> {waqt}</span>
          </p>
          <p>
            Date:
            <span> {date}</span>
          </p>
        </div>
        <div className={styles.proof_container}>
          {src !== undefined ? (
            <>
              <img
                className={styles.proof_img}
                src={src}
                alt={name}
                onClick={() => {
                  setImg(!img);
                }}
              />
            </>
          ) : (
            <p>No proof available for this expenditure</p>
          )}
        </div>
      </div>
      {img && <Img src={src} img={img} setImg={setImg} />}
      <div className={styles.shadow} onClick={() => setOpen(!open)}></div>
    </>
  );
}

function Img({ src, img, setImg }) {
  function imgFunc() {
    setImg(!img);
  }

  return (
    <>
      <div className={styles.image_container} onClick={imgFunc}>
        <img src={src} alt="No Image here" />
      </div>
      <div className={styles.image_shadow} onClick={imgFunc}></div>
    </>
  );
}
