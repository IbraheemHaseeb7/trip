import { useState } from "react";
import styles from "./expForm.module.css";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore, storage } from "../../libraries/firebase";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";

export default function ExpForm({ state, dispatch, trip, id }) {
  const inputs = [
    { name: "name", value: state.expenditure?.name, id: 1, type: "name" },
    { name: "cost", value: state.expenditure?.cost, id: 2, type: "number" },
    { name: "waqt", value: state.expenditure?.waqt, id: 3, type: "number" },
    { name: "date", value: state.expenditure?.date, id: 4, type: "date" },
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

  async function resetImage(e) {
    e.preventDefault();
    setImageFile("");
    await deleteObject(ref(storage, `${id}/${state.expenditure.src.id}`))
      .then((res) => {
        toast.success("Successfully Removed");
      })
      .catch(() => {
        toast.error("Unknown Error Occurred");
      });
    dispatch({ type: "image_reset" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const expId = new Date().getTime().toString();
    dispatch({ type: "add_id", payload: expId });
    const array = trip.expenditure;
    array.push(state.expenditure);
    await updateDoc(doc(firestore, `trips`, id), {
      expenditure: array,
    })
      .then(() => {
        toast.success("Successfully added new expenditure");
      })
      .catch(() => {
        toast.error("Some unknown error occurred");
      });
    dispatch({ type: "reset_expenditure" });
  }

  console.log(state.expenditure);

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
      <button onClick={handleSubmit} className={styles.btn} type="button">
        Submit
      </button>
    </div>
  );
}
