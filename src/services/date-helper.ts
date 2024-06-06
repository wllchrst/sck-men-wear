import { Timestamp } from "firebase/firestore";

export default class DateHelper {
  static now() {
    return Timestamp.fromDate(new Date());
  }
}
