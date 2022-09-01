import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";

export default async function handler(req, res) {
  let response;
  const body = JSON.parse(req.body);
  await updateDoc(doc(firestore, `trips`, body.id), {
    [body.type]: body.data,
  })
    .then(() => {
      response = "Successfully Added";
    })
    .catch(() => {
      response = "Unknown error occurred";
    });

  res.status(200).json({ res: response });
}
