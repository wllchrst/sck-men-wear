import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "../../assets/logo.png";
import { pages } from "../../settings/pages";
import NavigationLink from "../shared/nav-link";
import { getUserContext } from "../../context/user-context";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { userLogout } from "../../functions/user";
import { useNavigate } from "react-router-dom";
import NavbarLinks from "./navbar-links";

export default function Navbar() {
  const { isLoggedIn, user } = getUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue("blue.100", "blue.900")} px={4}>
        <Flex py={3} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <NavigationLink link="/">
              <Image src={logo} width={175} />
            </NavigationLink>
          </HStack>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NavbarLinks links={pages} />
            {isLoggedIn && user ? (
              <div className="justify-center items-center gap-3 flex">
                <Text fontWeight={"bold"}>{user.email}</Text>
                <Button
                  padding={0}
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    userLogout();
                    window.location.reload();
                  }}
                >
                  <BiLogOut color="black" />
                </Button>
              </div>
            ) : (
              <>
                <Button
                  padding={0}
                  colorScheme="whiteAlpha"
                  onClick={() => nav("/login")}
                >
                  <BiLogIn color="black" />
                </Button>
              </>
            )}
          </HStack>
          <Box
            display={{
              md: "none",
              base: "flex",
            }}
            className="items-center justify-center gap-2"
          >
            {!isLoggedIn ? (
              <Button
                padding={0}
                colorScheme="whiteAlpha"
                onClick={() => nav("/login")}
              >
                <BiLogIn color="black" />
              </Button>
            ) : (
              <div className="justify-center items-center gap-3 flex">
                <Text fontWeight={"bold"}>{user?.email}</Text>
                <Button
                  padding={0}
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    userLogout();
                    window.location.reload();
                  }}
                >
                  <BiLogOut color="black" />
                </Button>
              </div>
            )}

            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              bg={useColorModeValue("blue.100", "blue.900")}
              _hover={{ bg: useColorModeValue("blue.100", "blue.900") }}
            />
          </Box>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {pages.map((page, key) => (
                <div key={key}>
                  {page.subLinks.length >= 1 ? (
                    <>
                      <Menu>
                        <MenuButton
                          as={Button}
                          padding={0}
                          bg={"transparent"}
                          fontWeight={0}
                          _hover={{
                            textDecor: "underline",
                          }}
                          _active={{
                            bg: "transparent",
                          }}
                        >
                          {page.pageLink.display}
                        </MenuButton>
                        <MenuList className="">
                          {page.subLinks.map((subPage, key) => (
                            <div key={key}>
                              <MenuItem>
                                <NavigationLink link={subPage.link} key={key}>
                                  {subPage.display}
                                </NavigationLink>
                              </MenuItem>
                            </div>
                          ))}
                        </MenuList>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <NavigationLink link={page.pageLink.link} key={key}>
                        {page.pageLink.display}
                      </NavigationLink>
                    </>
                  )}
                </div>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
