import { useEffect, useState } from "react";
import FetchBuilder from "../builder/fetch-builder";
import { IChat } from "../interfaces/chat-interface";
import { chatWithAdminCollection } from "../settings/firebase-config";
import { orderBy, query } from "firebase/firestore";


export default function useManageChat(){
    const fetchBuilder = new FetchBuilder<IChat>()
    const [firstFetch, setFirstFetch] = useState(true)
    const [chats, setChats] = useState<{[email: string]: IChat[]}>({})

    const qry = query(chatWithAdminCollection, orderBy('createdAt', 'desc'))

    const { data, isLoading } = fetchBuilder.getAll(qry);

    useEffect(() => {
        var newChat = {...chats}
        for(const chat of data) {
            var isDouble = false
            if(!newChat[chat.email]) newChat[chat.email] = []

            for(const chatInformation of newChat[chat.email]) if(chatInformation.id == chat.id) {
                isDouble = true 
                continue
            }
            if(!isDouble) {
                if(firstFetch) {
                    newChat[chat.email].push(chat)
                }
                else newChat[chat.email].unshift(chat)
            }
        }

        setFirstFetch(false)

        setChats(newChat)
    }, [data])

    return { chats, isLoading }
}