import {
  Box,
  chakra,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { ReactNode } from "react";
import logo from "../../assets/logo.png";
import shopeeLogo from "../../assets/shopee-logo.png";
import tokpedLogo from "../../assets/tokopedia-logo.png";
import blibliLogo from "../../assets/blibli-logo.png";
import lazadaLogo from "../../assets/lazada-logo.png";
import { Settings } from "../../settings/settings";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      padding={1}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("blue.100", "blue.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image src={logo} width={"200px"} />
        <Text fontSize={"large"}>{Settings.NAMA_PT}</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"YouTube"} href={"#"}>
            <FaFacebook />
          </SocialButton>
          <SocialButton
            label={"Instagram"}
            href={"https://www.instagram.com/sckmenwear.official/"}
          >
            <FaInstagram />
          </SocialButton>
          <SocialButton label={"Shopee"} href={"#"}>
            <Image src={shopeeLogo} />
          </SocialButton>
          <SocialButton label={"Tokopedia"} href={"#"}>
            <Image src={tokpedLogo} />
          </SocialButton>
          <SocialButton label={"Lazada"} href={"#"}>
            <Image src={lazadaLogo} />
          </SocialButton>
          <SocialButton label={"Bli Bli"} href={"#"}>
            <Image src={blibliLogo} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
