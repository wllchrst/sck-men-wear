import { Timestamp } from "firebase/firestore";

export interface IChat {
  id: string;
  email: string;
  message: string;
  createdAt: Timestamp;
  isAdmin: boolean;
}
