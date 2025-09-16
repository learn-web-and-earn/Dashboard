// FirebaseContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "@/firebase/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const auth = getAuth(app);
  const db = getDatabase(app);

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // ✅ store extra userData
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const snapshot = await get(
            child(ref(db), `users/${currentUser.uid}/userData`)
          );
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("⚠️ No userData found for this user");
            setUserData(null);
          }
        } catch (error) {
          console.error("❌ Error fetching userData:", error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return (
    <FirebaseContext.Provider
      value={{ app, auth, user, userData, loading, login, logout }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
