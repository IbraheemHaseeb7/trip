import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../libraries/firebase";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  let response;

  switch (req.method) {
    case "PUT":
      await getDocs(
        query(
          collection(firestore, `trips`),
          where("status", "==", data.status),
          limit(10),
          orderBy("id", "desc")
        )
      ).then((res) => {
        response = res.docs.map((res) => {
          return res.data();
        });
      });
  }

  res.status(200).json({ data: response });
}
