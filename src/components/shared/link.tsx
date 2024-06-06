import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Link({
    children,
    link,
    color,
}: {
    children: ReactNode;
    link: string;
    color: string;
}) {
    return (
        <ChakraLink
            as={ReactRouterLink}
            to={link}
            textColor={color}
        >
            {children}
        </ChakraLink>
    );
}
