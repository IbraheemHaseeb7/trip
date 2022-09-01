import { useState } from "react";
import styles from "./expForm.module.css";

export default function ExpForm({ state, dispatch, trip, id }) {
  const inputs = [
    { name: "name", value: state.expediture?.name, id: 1, type: "name" },
    { name: "cost", value: state.expediture?.cost, id: 2, type: "number" },
    { name: "waqt", value: state.expediture?.waqt, id: 3, type: "number" },
    { name: "date", value: state.expediture?.date, id: 4, type: "date" },
  ];

  const [imageFile, setImageFile] = useState("");

  function handleChange(e) {
    dispatch({
      type: "expenditure",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleFile(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const blob = URL.createObjectURL(new Blob([file]));
    setImageFile(blob);
  }

  function resetImage(e) {
    e.preventDefault();
    setImageFile("");
  }

  return (
    <div className={styles.main_container}>
      {inputs.map(({ name, value, id, type }) => {
        return (
          <input
            name={name}
            key={id}
            type={type}
            value={value}
            onChange={handleChange}
            className={styles.inputs}
            placeholder={name}
          />
        );
      })}
      <div className={styles.image_container}>
        <input
          type="file"
          onChange={handleFile}
          onDrag={handleFile}
          onDragOver={handleFile}
          onDrop={handleFile}
          id="image"
        />
        <label
          htmlFor="image"
          onChange={handleFile}
          onDrag={handleFile}
          onDragOver={handleFile}
          onDrop={handleFile}
        >
          Drag and Drop Image here or Click to Add Image
          {imageFile && (
            <>
              <img src={imageFile} alt="No Image Found" />
              <button onClick={resetImage} type="button">
                Reset
              </button>
            </>
          )}
        </label>
      </div>
      <button className={styles.btn} type="button">
        Submit
      </button>
    </div>
  );
}
