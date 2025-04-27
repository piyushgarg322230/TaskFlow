import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./Firebase"; // Adjust the import path as necessary
import { doc, setDoc, collection, query, where,getDocs ,addDoc,updateDoc   } from "firebase/firestore";
import { updateProfile,onAuthStateChanged  } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

export const localUser = JSON.parse(localStorage.getItem("users"));

// Signup Function
export const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    const user = userCredential.user;
    console.log("User signed up successfully" + auth.currentUser);
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        password: password,
        createdAt: new Date().toISOString(),
      });
    }
    return { success: true, user: user };
  } catch (error) {
    error.message = error.message.replace("Firebase: ", "").replace("auth/", "").replace("(", "").replace(")", "").replace(/-/g, " ");
    return { success: false, message: error.message };
  }
};

// Login Function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully" + userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const findUserByEmail = async (email) => {
  const usersRef = collection(db, "users"); // or "users"
  const q = query(usersRef, where("email", "==", email));
  let userData;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    userData = doc.data();
  });
  return userData;
};

export const updateUserField = async (userId, fieldData) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, fieldData);
    console.log("User updated");
  } catch (err) {
    console.error("Error updating user:", err);
  }
  
};

export const addStartDoc = async (userId, data,list,id) => {
  try {
    const docRef = doc(db, "users", userId, list, id+"");
    await setDoc(docRef, data);
    console.log("Document written successfully!");
  } catch (err) {
    console.error("Error adding start document:", err);
  }
};

export const handleLogoutFirebase = async () => {
  try {
    await signOut(auth);
    localStorage.clear(); // Clear local storage
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const fetchUserTasks = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const tasksCol = collection(db, "users", user.uid, "tasks");
          const snapshot = await getDocs(tasksCol);

          const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          resolve(tasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          reject(error);
        }
      } else {
        console.warn("No user logged in");
        resolve([]); // Return empty if user not logged in
      }
    });
  });
};


export const completeTask = async (taskId, completed) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const taskRef = doc(db, "users", user.uid, dataBaseKey.tasks, taskId+"");
      await updateDoc(taskRef, { completed: completed, completedAt: new Date().toISOString() });
      console.log("Task updated successfully");
    } else {
      console.warn("No user logged in");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// Logout Function
export const logout = async () => {
  await signOut(auth);
};

export const dataBaseKey = {
  "tasks": "tasks",
}