import { Divider, Grid, Text } from "@chakra-ui/react";
import { testimoniItem } from "../../settings/testimoni-items";
import TestimoniItem from "./testimoni-item";

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

      <Grid
        className="flex justify-center items-center px-16"
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gridGap={14}
      >
        {testimoniItem.map((image, key) => (
          <div key={key}>
            <TestimoniItem url={image} />
          </div>
        ))}
      </Grid>
    </div>
  );
}
