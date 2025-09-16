import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "@/firebase/firebase";

const auth = getAuth(app);
const db = getDatabase(app);

export const createAdminUser = async (email, password ,name) => {
  try {
    // 1️⃣ Create new Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 2️⃣ Save user data in Realtime Database
    await set(ref(db, "users/" + uid + "/userData"), {
      email,
      name,
      isAdmin: true, // ✅ make this user an admin
    });

    console.log("✅ Admin user created successfully:", uid);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  }
};
