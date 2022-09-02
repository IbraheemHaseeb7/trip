import { useState } from "react";
import styles from "./expForm.module.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../libraries/firebase";
import toast from "react-hot-toast";

export default function ExpForm({ state, dispatch, trip, id }) {
  const inputs = [
    { name: "name", value: state.expediture?.name, id: 1, type: "name" },
    { name: "cost", value: state.expediture?.cost, id: 2, type: "number" },
    { name: "waqt", value: state.expediture?.waqt, id: 3, type: "number" },
    { name: "date", value: state.expediture?.date, id: 4, type: "date" },
  ];

  const [imageFile, setImageFile] = useState("");
  const [progress, setProgress] = useState(0);

  function handleChange(e) {
    dispatch({
      type: "expenditure",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  async function handleFile(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const blob = URL.createObjectURL(new Blob([file]));
    setImageFile(blob);
    return file;
  }

  async function uploadImage(file) {
    const proofId = new Date().getTime().toString();

    const uploader = uploadBytesResumable(
      ref(storage, `${id}/${proofId}`),
      file
    );
    uploader.on(
      "state_changed",
      (e) => {
        setProgress((e.bytesTransferred / e.totalBytes) * 100);
      },
      (err) => {},
      (suc) => {
        getDownloadURL(ref(storage, `${id}/${proofId}`)).then((res) => {
          toast.success("Successfully Uploaded");
          dispatch({ type: "image_link", payload: { link: res, id: proofId } });
        });
      }
    );
  }

  console.log(state.expenditure);

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
          onDrop={async (e) => {
            const file = await handleFile(e);
            await uploadImage(file);
          }}
        >
          Drag and Drop Image here or Click to Add Image
          {imageFile && (
            <>
              <img src={imageFile} alt="No Image Found" />
              <button onClick={resetImage} type="button">
                Reset
              </button>
              <div className={styles.loading}>
                <div style={{ width: `${progress}%` }}></div>
              </div>
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
