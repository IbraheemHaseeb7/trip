// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../libraries/firebase";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  let response;

  switch (req.method) {
    case "PUT":
      await setDoc(doc(firestore, `trips`, data.id), data)
        .then(() => {
          response = "Successfully written in the database";
        })
        .catch(() => {
          response = "Unknown error occurred";
        });
  }
  res.status(200).json({ res: response });
}
