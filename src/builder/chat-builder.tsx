import { v4 } from "uuid";
import { IChat } from "../interfaces/chat-interface";
import { User } from "../interfaces/user-interface";
import DateHelper from "../services/date-helper";
import { Settings } from "../settings/settings";


export class ChatBuilder {
    static createChat (user: User, message: string, customerEmail: string | null) {
        const chat : IChat = {
            createdAt: DateHelper.now(),
            email: (customerEmail == null ? user.email : customerEmail),
            id: v4(),
            message: message,
            isAdmin: user.userRole == Settings.ADMIN
        }
        return chat;
    }
}