import { User } from "./user-interface";

export interface IUserContext {
  user: User | null;
  isLoggedIn: boolean;
  setCurrentUser: (user: User) => void;
  setLoggedIn: (loggedIn: boolean) => void;
}
