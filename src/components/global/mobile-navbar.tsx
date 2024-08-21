import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { NavbarLink } from "../../interfaces/navbar-interface";
import NavigationLink from "../shared/nav-link";
import { getUserContext } from "../../context/user-context";
import { showingNavbar } from "../../services/helper";

interface I {
  pages: NavbarLink[];
}

function MobileNavbar({ pages }: I) {
  const { user } = getUserContext();
  return (
    <>
      <Box pb={4} display={{ md: "none" }} className="">
        <Stack as={"nav"} spacing={4}>
          {pages.map((page, key) => (
            <>
              {showingNavbar(page, user) ? (
                <div key={key}>
                  {page.subLinks.length >= 1 ? (
                    <>
                      <Menu>
                        <MenuButton
                          height={"0"}
                          as={Button}
                          padding={0}
                          margin={0}
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
              ) : (
                <></>
              )}
            </>
          ))}
        </Stack>
      </Box>
    </>
  );
}

export default MobileNavbar;
