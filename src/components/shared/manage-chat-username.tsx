import { Box, Text } from "@chakra-ui/react";

interface I {
  username: string;
  setCurrentUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function ManageChatUsername({
  username,
  setCurrentUsername,
}: I) {
  return (
    <Box
      className="flex p-2 flex-col"
      borderBottom={"1px solid black"}
      _hover={{
        backgroundColor: "gray.200"
      }}
      onClick={() => {
        setCurrentUsername(username);
      }}
    >
      <Text fontWeight={"bold"} fontSize={"large"}>
        {username}
      </Text>
      <Text fontSize="sm">dummy chat</Text>
    </Box>
  );
}
