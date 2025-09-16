import { createContext, useContext } from "react";
import { app } from "../firebase/firebase";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app }}>
      {children}
    </FirebaseContext.Provider>
  );
};
