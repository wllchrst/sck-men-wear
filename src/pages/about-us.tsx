import { Spacer } from "@chakra-ui/react";
import Location from "../components/shared/location";
import Testimoni from "../components/shared/testimoni";
import WhyChooseUs from "../components/shared/why-choose-us";

export default function AboutUs() {
  return (
    <>
      <WhyChooseUs />
      <Location />
      <Testimoni />
      <Spacer height={"100px"}/>
    </>
  );
}
