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
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // ✅ store all users
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          // fetch current userData
          const snapshot = await get(
            child(ref(db), `users/${currentUser.uid}/userData`)
          );
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            setUserData(null);
          }

          // fetch all users
          const allUsersSnapshot = await get(ref(db, "users"));
          if (allUsersSnapshot.exists()) {
            const usersArray = Object.values(allUsersSnapshot.val());
            setAllUsers(usersArray);
          } else {
            setAllUsers([]);
          }
        } catch (error) {
          console.error("❌ Error fetching data:", error);
        }
      } else {
        setUserData(null);
        setAllUsers([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  return (
    <FirebaseContext.Provider
      value={{ app, auth, user, userData, allUsers, loading, login, logout }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
