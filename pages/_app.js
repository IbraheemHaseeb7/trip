import "../styles/globals.css";
import Navbar from "../components/navbar/navbar";
import React, { useState } from "react";
import useAuth from "../components/auth/useAuth";
import { Toaster } from "react-hot-toast";

export const AuthProvider = React.createContext();

function MyApp({ Component, pageProps }) {
  const [signIn, setSignIn] = useState(false);
  const [sign] = useAuth();

  return (
    <AuthProvider.Provider value={{ signIn, sign }}>
      <Toaster />
      <Navbar setSignIn={setSignIn} signIn={signIn} />
      <Component {...pageProps} />
    </AuthProvider.Provider>
  );
}

export default MyApp;
