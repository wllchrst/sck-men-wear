import { Box, Button, Tooltip } from "@chakra-ui/react";
import { ChatIcon, EmailIcon } from "@chakra-ui/icons";
import { Settings } from "../../settings/settings";
import NewTabLink from "../shared/anchor-new-tab";
import ChatWithAdmin from "../shared/chat-with-admin";
import { getUserContext } from "../../context/user-context";

export default function () {
  const {user, isLoggedIn} = getUserContext();

  if(user != null && user.userRole == Settings.ADMIN) return <></>

  return (
    <Box className="fixed bottom-0 right-0 bg-transparent text-white text-center z-50 p-4">
      <Box
        className="p-4 flex gap-10 rounded-lg items-center"
        backgroundColor={"blue.300"}
      >
        <NewTabLink link={Settings.linktree_link}>
          <Tooltip label="Kontak Kita">
              <EmailIcon color={"black"} width={"30px"} height={"30px"} />
          </Tooltip>
        </NewTabLink>
        <ChatWithAdmin />
      </Box>
    </Box>
  );
}
