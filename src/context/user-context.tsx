import { createContext, useContext, useState } from "react";
import { IUserContext } from "../interfaces/user-context-interface";
import { IChildren } from "../interfaces/children-interface";
import { User } from "../interfaces/user-interface";

const userContext = createContext({} as IUserContext);

export default function UserContextProvider({ children }: IChildren) {
  const [user, setUser] = useState({} as User);
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function setCurrentUser(user: User) {
    if (user == null) setIsLoggedIn(false);
    

    setIsLoggedIn(true);
    setUser(user);
  }

  function setLoggedIn(loggedIn: boolean) {
    setIsLoggedIn(loggedIn);
  }

  function setCurrentUserEmail(currentUserEmail: string) {
    setUserEmail(currentUserEmail)
  }

  const data = { user, setCurrentUser, isLoggedIn, setLoggedIn, userEmail, setCurrentUserEmail };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
}

export function getUserContext() {
  return useContext(userContext);
}
