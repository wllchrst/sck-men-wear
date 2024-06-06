import { Box, Button, Heading, Input } from "@chakra-ui/react";
import registerBackground from "../assets/register-page-background.gif";
import Link from "../components/shared/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { changeHandle } from "../services/helper";
import { userRegister } from "../functions/user";
import { User } from "../interfaces/user-interface";
import { ToastBuilder } from "../builder/toast-builder";
import { getUserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

export default function Register() {
  const [user, setUser] = useState({} as User);
  const toast = new ToastBuilder("Membuat akun");
  const userContext = getUserContext();
  const navigation = useNavigate();

  useEffect(() => {
    console.log(userContext);
    if (userContext.isLoggedIn) {
      navigation("/");
    }
  }, [userContext]);

  function buttonHandle() {
    user.userRole = "customer";
    user.id = v4();
    toast.infoToast("Mohon tunggu sebentar");
    userRegister(user).then((result) => {
      toast.closeAllToast();
      if (result) toast.successToast("Registrasi sukses");
      else toast.failedToast("Registrasi gagal");
    });
  }

  return (
    <Box
      backgroundImage={registerBackground}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      className="flex w-screen h-screen justify-center items-center"
    >
      <div className="flex w-full h-full items-center justify-center bg-black bg-opacity-50">
        <Box position={"fixed"} left={0} top={0} padding={5}>
          <Button padding={3} as={ArrowBackIcon}></Button>
        </Box>
        <Box
          className="border-4 p-8 border-gray-300 shadow-lg rounded-md flex justify-center bg-sky-100 flex-col gap-6"
          width={{ lg: "35%", md: "50%", base: "80%" }}
        >
          <div>
            <Heading size={"lg"}>Selamat Datang!</Heading>
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
              variant={"flushed"}
              name="password"
              onChange={(e) => changeHandle(user, setUser, e)}
            />
            <Button
              className="flex w-full mt-4 "
              colorScheme="teal"
              onClick={() => buttonHandle()}
            >
              Register
            </Button>
            <Link color="rgb(0,40,150)" link="/login">
              Sudah Punya Akun?
            </Link>
          </div>
        </Box>
      </div>
    </Box>
  );
}
