import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { NavbarLink } from "../../interfaces/navbar-interface";
import NavigationLink from "../shared/nav-link";
import { getUserContext } from "../../context/user-context";
import { showingNavbar } from "../../services/helper";

interface I {
  links: NavbarLink[]
}

export default function NavbarLinks({ links }: I) {
  const { user } = getUserContext()

  return <>
    {links.map((page, key) => (
      <div key={key} className={!showingNavbar(page, user) ? "hidden" : ""}>
        {!showingNavbar(page, user) ? null :
          <div key={key} className="flex justify-between items-center">
            {page.subLinks.length > 0 ? (
              <div>
                <Menu>
                  <MenuButton
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
                    className="flex justify-center items-center"
                    lineHeight={'unset'}
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
              </div>
            ) : (
              <NavigationLink link={page.pageLink.link} key={key}>
                {page.pageLink.display}
              </NavigationLink>
            )}
          </div>
        }
      </div>
    ))}
  </>
}