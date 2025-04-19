import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth ,db } from "./Firebase"; // Adjust the import path as necessary
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

// Signup Function
export const signup = async (name,email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    const user = userCredential.user;
    console.log("User signed up successfully"+auth.currentUser);
    if(user){
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name:user.displayName,
        email:user.email,
        password: password,
        createdAt: new Date().toISOString(),
      });
    }
    return { success: true, user:user };
  } catch (error) {
    error.message = error.message.replace("Firebase: ", "").replace("auth/", "").replace("(", "").replace(")", "").replace(/-/g, " ");
    return { success: false, message: error.message };
  }
};

// Login Function
export const login = async (email, password) => {
  try {
    const userCredential=await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully"+userCredential.user);
    return { success: true, user:userCredential.user  };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Logout Function
export const logout = async () => {
  await signOut(auth);
};
