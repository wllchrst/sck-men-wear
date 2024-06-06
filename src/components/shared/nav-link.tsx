import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function NavigationLink({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) {
  return (
    <ChakraLink
      bg={"none"}
      paddingY={3}
      as={ReactRouterLink}
      rounded={"md"}
      _hover={{
        textDecoration: "underline",
        bg: "none",
      }}
      to={link}
    >
      {children}
    </ChakraLink>
  );
}