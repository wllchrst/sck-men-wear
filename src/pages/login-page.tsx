import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import loginPageBackground from "../assets/login-page-background.gif";
import Link from "../components/shared/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { ToastBuilder } from "../builder/toast-builder";
import { getUserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import { changeHandle } from "../services/helper";
import { userLogin } from "../functions/user";
import { User } from "../interfaces/user-interface";
import UserService from "../services/user-service";

export default function Login() {
  const [user, setUser] = useState({} as User);
  const toast = new ToastBuilder("Login");
  const userContext = getUserContext();
  const navigation = useNavigate();

  function buttonHandle() {
    console.log(user);
    toast.infoToast("Mohon tunggu sebentar");
    userLogin(user).then((result) => {
      toast.closeAllToast();
      if (result) toast.successToast("Login sukses");
      else toast.failedToast("Login gagal");
    });
  }

  console.log(UserService.userEmail)

  useEffect(() => {
    console.log(userContext.isLoggedIn);
    if (userContext.isLoggedIn) {
      navigation("/");
    }
  }, [userContext]);

  return (
    <Box
      backgroundImage={loginPageBackground}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      className="flex w-screen h-screen justify-center items-center"
      position={"relative"}
    >
      <Box position={"fixed"} left={0} top={0} padding={5}>
        <Button padding={3} as={ArrowBackIcon}></Button>
      </Box>
      <div className="flex w-full h-full items-center justify-center bg-black bg-opacity-50">
        <Box
          className="border-4 p-8 border-gray-300 shadow-lg rounded-md flex justify-center bg-sky-100 flex-col gap-6"
          width={{ lg: "35%", md: "50%", base: "80%" }}
        >
          <div>
            <Heading size={"lg"}>Silahkan Login!</Heading>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <Input
              placeholder="Email"
              type="text"
              variant={"flushed"}
              name="email"
              onChange={(e) => changeHandle(user, setUser, e)}
            />
            <Input
              placeholder="Password"
              type="password"
              name="password"
              variant={"flushed"}
              onChange={(e) => changeHandle(user, setUser, e)}
            />
            <Button
              className="flex w-full mt-4"
              colorScheme="teal"
              onClick={() => buttonHandle()}
            >
              Login
            </Button>
            <Link color="rgb(0,40,150)" link="/register">
              Tidak Punya Akun?
            </Link>
          </div>
        </Box>
      </div>
    </Box>
  );
}
