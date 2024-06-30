import FirebaseHelper from "./firebase-helper";
import { userCollection } from "../settings/firebase-config";
import { User } from "../interfaces/user-interface";

export default class UserService {
    static firebaseHelper: FirebaseHelper<User> = new FirebaseHelper()
    static userEmail: string = ""

    constructor() {
    }

    static getCurrentUserEmail(): string | null {
        if (this.userEmail == null) return null
        return this.userEmail
    }

    static async LoginUser(email: string): Promise<User | null> {
        const users = await this.firebaseHelper.getAll(userCollection)

        for (const user of users) {
            if (user.email == email) {
                this.userEmail = email

                return user
            }
        }

        return null
    }

    static async getUserInformation(): Promise<User | null> {
        const users = await this.firebaseHelper.getAll(userCollection)

        for (const user of users) {
            if (user.email == this.userEmail) {
                return user
            }
        }

        return null
    }
}
