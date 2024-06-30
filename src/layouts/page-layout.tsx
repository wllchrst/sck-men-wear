import { getUserContext } from "../context/user-context";
import { useEffect } from "react";
import { IChildren } from "../interfaces/children-interface";
import UserService from "../services/user-service";

export default function PageLayout({ children }: IChildren) {
  const { setCurrentUser, setLoggedIn, userEmail } = getUserContext();

  useEffect(() => {
    if (userEmail == "") return

    UserService.getUserInformation().then((userInformation) => {
      if (userInformation == null) return

      setCurrentUser(userInformation)
      setLoggedIn(true)
    })
  }, [userEmail]);

  return <>{children}</>;
}