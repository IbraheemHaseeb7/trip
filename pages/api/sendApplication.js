import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";

export default async function handler(req, res) {
  let response;
  let body = JSON.parse(req.body);

  console.log(body);
  switch (req.method) {
    case "PUT":
      await updateDoc(doc(firestore, `trips`, body.id), {
        adminApplicants: body.adminsArray,
      })
        .then(() => {
          response = "Request Submitted Successfully...";
        })
        .catch(() => {
          response = "Unknown Error Occurred...";
        });
  }

  res.status(200).json({ data: response });
}
