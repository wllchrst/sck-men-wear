import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { getUserContext } from "../../context/user-context";
import { IChat } from "../../interfaces/chat-interface";
import DateHelper from "../../services/date-helper";
import { ToastBuilder } from "../../builder/toast-builder";
import { v4 } from "uuid";
import { uploadChat } from "../../functions/chat";
import FetchBuilder from "../../builder/fetch-builder";
import { orderBy, query, where } from "firebase/firestore";
import { chatWithAdminCollection } from "../../settings/firebase-config";

export default function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const { user } = getUserContext();
  const toast = new ToastBuilder("Chat with admin");
  const fetchBuilder = new FetchBuilder<IChat>();

  const qry = query(
    chatWithAdminCollection,
    orderBy("createdAt", "desc"),
    where("email", "==", user?.email)
  );

  const { data, isLoading } = fetchBuilder.getAll(qry);

  console.log(`${data}, ${isLoading}`);

  function uploadChatHandle() {
    if (user == null) {
      toast.failedToast("Login terlebih dahulu untuk chat");
      return;
    }

    if (userInput.trim() == "") return;

    const data: IChat = {
      id: v4(),
      message: userInput,
      createdAt: DateHelper.now(),
      email: user?.email,
      isAdmin: user.userRole == "admin",
    };

    uploadChat(data);
  }

  function clickHandle() {
    uploadChatHandle();
    setUserInput("");
  }

  function keyUpHandle(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      uploadChatHandle();
      setUserInput("");
    }
  }

  return (
    <Box border={""} className="h-full flex flex-col gap-1 w-full">
      <Box
        border={''}
        className="flex rounded-md mb-4"
        width={"100%"}
        height={"90%"}
      >
        <Box
          className="flex flex-col-reverse w-full m-3 gap-4 h-full"
          backgroundColor={"white"}
          overflow={"hidden"}
          overflowY={"scroll"}
        >
          {data.map((chat, index) => (
            <div key={index}>
              {chat.isAdmin ? (
                <div className="flex justify-start">
                  <div className="p-2 bg-slate-800 rounded-md">
                    <p className="text-white">{chat.message}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end ">
                  <div className="p-2 bg-blue-300 rounded-md">
                    <p className="text-black">{chat.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Box>
      </Box>
      <HStack height={"10%"} justifyContent={"center"} alignItems={"center"}>
        <Box
          height={"100%"}
          width={"90%"}
          border={""}
          className="flex justify-center items-center"
        >
          <Input
            onKeyDown={(e) => keyUpHandle(e)}
            value={userInput}
            placeholder="Ketik disini..."
            onChange={(e) => setUserInput(e.target.value)}
          ></Input>
        </Box>
        <Box>
          <Button
            as={ChevronRightIcon}
            padding={2}
            onClick={() => clickHandle()}
          ></Button>
        </Box>
      </HStack>
    </Box>
  );
}
