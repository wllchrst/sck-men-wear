import { User } from "../interfaces/user-interface";
import { userCollection } from "../settings/firebase-config";
import FirebaseHelper from "../services/firebase-helper";
import { getDocs, query, where } from "firebase/firestore";
import { IResponse, createResponse } from "../interfaces/response-interface";
import UserService from "../services/user-service";
import Cookies from "js-cookie";
import { Settings } from "../settings/settings";

const helper = new FirebaseHelper();

function validateUserCreation(user: User): IResponse {
  let message = ""

  if (user.email == "") message = "Email cannot be empty"
  else if (user.password) message = "Password cannot be empty"

  const response: IResponse = {
    message: message,
    success: message == ""
  }

  return response
}

async function userRegister(user: User): Promise<IResponse> {
  try {
    const validationResult = validateUserCreation(user)

    if (!validationResult.success) return validationResult

    const result = helper.create(userCollection, user);

    if (!result) return createResponse("Gagal membuat akun", result)

    return createResponse("Sukses membuat akun", true)
  } catch (error) {
    console.log(error);
    return createResponse("Gagal membuat akun", false)
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

function userLogout() {
  Cookies.remove(Settings.userEmailCookie)
}

async function userLogin(user: User): Promise<User | null> {
  try {
    const loginResult = await UserService.LoginUser(user.email)
    if(loginResult == null) return null

    Cookies.set(Settings.userEmailCookie, loginResult.email)

    console.log(loginResult)

    return loginResult
  } catch (error) {
    console.log(error)
    return null
  }
}

export { userRegister, userLogin, getUser, userLogout };
