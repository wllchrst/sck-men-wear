import { Spinner, Text } from "@chakra-ui/react";
import Carousel from "../components/global/carousel";
import CreatePromotion from "../components/shared/create-promotion";
import useFetchPromotion from "../hooks/use-fetch-promotion";

export default function Promotion() {
  const { promotions, isLoading } = useFetchPromotion();
  if (isLoading) <></>;
  return (
    <div>
      <Text className="p-4" fontWeight={"bold"}>
        Preview
      </Text>
      {isLoading ? (
        <div className="p-4">
          <Spinner />
        </div>
      ) : (
        <Carousel slide={promotions} isAdmin={true} />
      )}

      <CreatePromotion />
    </div>
  );
}
