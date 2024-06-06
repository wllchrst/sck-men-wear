import { onAuthStateChanged } from "firebase/auth";
import { getUserContext } from "../context/user-context";
import { useEffect } from "react";
import { auth } from "../settings/firebase-config";
import { getUser } from "../functions/user";
import { IChildren } from "../interfaces/children-interface";

export default function PageLayout({ children }: IChildren) {
  const { setCurrentUser, setLoggedIn } = getUserContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser != null && currentUser.email != null) {
        getUser(currentUser.email).then((user) => {
          if (user != null) {
            setCurrentUser(user);
          } else {
            setLoggedIn(false);
          }
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return <>{children}</>;
}
