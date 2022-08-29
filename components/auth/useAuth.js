import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../libraries/firebase";

export default function useAuth() {
  const [sign, setsign] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setsign(true);
      } else {
        setsign(false);
      }
    });
  }, [router.query]);

  return [sign];
}
