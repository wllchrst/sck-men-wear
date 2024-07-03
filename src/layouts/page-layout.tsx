import { getUserContext } from "../context/user-context";
import { useEffect } from "react";
import { IChildren } from "../interfaces/children-interface";
import UserService from "../services/user-service";
import Cookies from "js-cookie";
import { Settings } from "../settings/settings";

export default function PageLayout({ children }: IChildren) {
  const { setCurrentUser, setLoggedIn } = getUserContext();

  useEffect(() => {
    const userEmail = Cookies.get(Settings.userEmailCookie)

    if(userEmail == undefined) return
    else UserService.userEmail = userEmail

    UserService.getUserInformation().then((userInformation) => {
      if (userInformation == null) return

      setCurrentUser(userInformation)
      setLoggedIn(true)
    })
  }, []);

  return <>{children}</>;
}