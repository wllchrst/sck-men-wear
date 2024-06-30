import { User } from "./user-interface";

export interface IUserContext {
  user: User | null;
  userEmail: string;
  isLoggedIn: boolean;
  setCurrentUser: (user: User) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setCurrentUserEmail: (currentUserEmail: string) => void;
}
