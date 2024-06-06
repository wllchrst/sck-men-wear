import { Skeleton, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Stack className="p-5">
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
}
