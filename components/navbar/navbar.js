import styles from "./navbar.module.css";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../libraries/firebase";
import { useContext, useState } from "react";
import { AuthProvider } from "../../pages/_app";
import { useRouter } from "next/router";

export default function Navbar({ setSignIn, signIn }) {
  async function signin(e) {
    e.preventDefault();

    await signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        setSignIn(true);
      })
      .catch(() => setSignIn(false));
  }

  const { sign } = useContext(AuthProvider);
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      {sign ? (
        <button
          className={styles.navbar_btn}
          type="button"
          onClick={async () => {
            await signOut(auth)
              .then(() => setSignIn(false))
              .catch(() => setSignIn(true));
          }}
        >
          Sign Out
        </button>
      ) : (
        <button className={styles.navbar_btn} type="button" onClick={signin}>
          Sign In
        </button>
      )}
      <button
        className={styles.navbar_btn}
        type="button"
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </button>
    </nav>
  );
}
