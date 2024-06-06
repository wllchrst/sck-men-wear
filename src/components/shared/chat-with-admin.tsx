import { ChatIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { ToastBuilder } from "../../builder/toast-builder";
import { getUserContext } from "../../context/user-context";
import ChatBox from "./chat-box";
import FetchBuilder from "../../builder/fetch-builder";


export default function ChatWithAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toastBuilder = new ToastBuilder("Chat Admin");
  const { isLoggedIn, user } = getUserContext();

  function openDrawer() {
    if (!isLoggedIn || user == null) {
      toastBuilder.failedToast("Silahkan login terlebih dahulu");
      return;
    }
    onOpen();
  }

  return (
    <>
      <Tooltip label="Chat Langsung">
        <Button
          as={ChatIcon}
          padding={0}
          bg={"transparent"}
          width={"25px"}
          height={"25px"}
          onClick={() => openDrawer()}
          _hover={{
            bg: "transparent",
          }}
        ></Button>
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat Admin</DrawerHeader>

          <DrawerBody>
            {user == null ? <></> :<ChatBox></ChatBox> }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
