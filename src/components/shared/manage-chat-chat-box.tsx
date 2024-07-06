import { Box, Button, Center, HStack, Input, Text } from "@chakra-ui/react";
import { IChat } from "../../interfaces/chat-interface";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { uploadChat, validateChat } from "../../functions/chat";
import { ChatBuilder } from "../../builder/chat-builder";
import { getUserContext } from "../../context/user-context";

interface I {
  chats: IChat[] | null;
  email: string;
}

export default function ManageChatBox({ chats, email }: I) {
  const [userInput, setUserInput] = useState("");
  const { user } = getUserContext();

  function upload() {
    if (user == null) return;
    const chat = ChatBuilder.createChat(user, userInput, email);
    const validationResult = validateChat(chat);

    if (!validationResult.success) {
      console.log(validationResult.message);
      return;
    }

    uploadChat(chat);
    setUserInput("");
  }

  function keyDownHandle(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      upload();
    }
  }

  function onClickHandle() {
    upload();
  }

  if (chats == null)
    return (
      <Center height={"100%"}>
        <Text fontSize={"xx-large"}>Pilih Customer</Text>
      </Center>
    );

  return (
    <Box className="flex flex-col justify-between gap-2 rounded-md" height={"100%"}>
      <Box className="flex px-4 py-2" borderBottom={'1px solid black'}>{email}</Box>
      <Box
        height={"100%"}
        className="rounded-md flex flex-col-reverse gap-1 p-2"
        overflow={"hidden"}
        overflowY={"auto"}
      >
        {chats.map((chat, index) => (
          <div key={index}>
            {chat.isAdmin ? (
              <Box className="flex justify-end">
                <Box className="bg-blue-300 p-2 rounded-md text-black">
                  <Text>{chat.message}</Text>
                </Box>
              </Box>
            ) : (
              <Box className="flex justify-start">
                <Box className="bg-slate-800 p-2 rounded-md text-white">
                  <Text>{chat.message}</Text>
                </Box>
              </Box>
            )}
          </div>
        ))}
      </Box>
      <HStack padding={"0 .5rem .5rem .5rem"}>
        <Input
          value={userInput}
          placeholder="Ketik disini...."
          onChange={(event) => setUserInput(event.target.value)}
          onKeyDown={(event) => keyDownHandle(event)}
        />
        <Button
          as={ChevronRightIcon}
          padding={2}
          onClick={() => onClickHandle()}
        ></Button>
      </HStack>
    </Box>
  );
}
