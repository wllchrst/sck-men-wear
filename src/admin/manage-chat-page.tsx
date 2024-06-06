import { Box } from "@chakra-ui/react";
import useManageChat from "../hooks/use-manage-chat";
import Loading from "../components/global/loading";
import ManageChatUsername from "../components/shared/manage-chat-username";
import ManageChatBox from "../components/shared/manage-chat-chat-box";
import { useState } from "react";

export default function ManageChat() {
  const { chats, isLoading } = useManageChat();
  const [currentUsername, setCurrentUsername] = useState("");

  if (isLoading) return <Loading></Loading>;

  return (
    <Box
      margin={"0.5rem"}
      className="flex rounded-md"
      height={"80vh"}
      border={"1px solid black"}
    >
      <Box height={"100%"} borderRight={'1px solid black'} width={"25%"} overflowY={"scroll"}>
        {Object.entries(chats).map(([username, _], key) => (
          <div key={key}>
            <ManageChatUsername
              setCurrentUsername={setCurrentUsername}
              username={username}
              key={key}
            />
          </div>
        ))}
      </Box>
      <Box height={"100%"} width={"75%"}>
        {currentUsername == "" ? (
          <ManageChatBox chats={null} email="" />
        ) : (
          <ManageChatBox chats={chats[currentUsername]} email={currentUsername} />
        )}
      </Box>
    </Box>
  );
}
