import { Divider, Grid, Text } from "@chakra-ui/react";

export default function Testimoni() {
  return (
    <div>
      <div className="flex justify-center mb-12 flex-col items-center gap-5">
        <Text
          fontWeight={"light"}
          letterSpacing={"5px"}
          fontSize={{ lg: "xx-large", base: "large", md: "x-large" }}
        >
          TESTIMONI
        </Text>
        <Divider width={"50%"} />
      </div>

      <Grid></Grid>
    </div>
  );
}
