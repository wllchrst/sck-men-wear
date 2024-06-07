import { Box, Center, Divider, Image, Text } from "@chakra-ui/react";
import { Settings } from "../../settings/settings";
import NewTabLink from "./anchor-new-tab";
import mapImage from "../../assets/google-map-image.png";
import locationImage from "../../assets/skj-location-image.png";

export default function Location() {
  return (
    <div className=" mb-32 mt-16">
      <div className="flex justify-center mb-12 flex-col items-center gap-5">
        <Text
          fontWeight={"light"}
          letterSpacing={"5px"}
          fontSize={{ lg: "xx-large", base: "large", md: "x-large" }}
        >
          LOKASI
        </Text>
        <Divider width={"50%"} />
      </div>

      <Center>
        <Text fontSize={'x-large'} marginBottom={'3rem'}>{Settings.lokasi_jualan}</Text>
      </Center>
      <div className="flex px-24 items-center gap-8 justify-center">
        <div className="w-1/2 flex flex-col">
          <NewTabLink link={Settings.google_map_link}>
            <Box
              width={"calc(0.4 * 100vw)"}
              height={"calc(0.4 * 100vw)"}
              border={"1px solid black"}
            >
              <Image
                src={mapImage}
                objectFit={"cover"}
                width={"100%"}
                height={"100%"}
              />
            </Box>
          </NewTabLink>
        </div>
        <div className="w-1/2">
          {/* <Text width={"100%"} fontSize={"large"}>
            {Settings.lokasi_jualan}
          </Text> */}
          <NewTabLink link={Settings.google_map_link}>
            <Box
              width={"calc(0.4 * 100vw)"}
              height={"calc(0.4 * 100vw)"}
              border={"1px solid black"}
            >
              <Image
                src={locationImage}
                objectFit={"cover"}
                width={"100%"}
                height={"100%"}
              />
            </Box>
          </NewTabLink>
        </div>
      </div>
    </div>
  );
}
