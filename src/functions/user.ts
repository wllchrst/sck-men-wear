import { User } from "../interfaces/user-interface";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, userCollection } from "../settings/firebase-config";
import FirebaseHelper from "../services/firebase-helper";
import { getDocs, query, where } from "firebase/firestore";

const helper = new FirebaseHelper();

async function userRegister(user: User) {
  try {
    const result = helper.create(userCollection, user);

    if (!result) throw "adding docs to user failed";
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    console.log(userCredential);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getUser(email: string) {
  try {
    const q = query(userCollection, where("email", "==", email));

    const snapshot = await getDocs(q);

    if (snapshot.docs[0] == null) {
      return null;
    }

    return snapshot.docs[0].data() as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function userLogin(user: User) {
  try {
    signInWithEmailAndPassword(auth, user.email, user.password);
    return true;
  } catch (error) {
    return false;
  }
}

async function userLogout() {
  signOut(auth);
}

export { userRegister, userLogin, userLogout, getUser };
