import {
  Box,
  Button,
  ButtonSpinner,
  Center,
  Divider,
  Grid,
  Text,
} from "@chakra-ui/react";
import { famousCategories } from "../../settings/famous-categories";
import ChangeCategoryProductImage from "./change-category-product-image";
import useFetchPopularCategories from "../../hooks/use-fetch-popular-category";
import Loading from "../global/loading";
import { getUserContext } from "../../context/user-context";
import { Settings } from "../../settings/settings";

export default function KategoriProdukUnggulan() {
  const { isLoading, popularCategory } = useFetchPopularCategories();
  const { user } = getUserContext();

  if (isLoading) return <Loading />;

  return (
    <div className="w-screen mt-9">
      <div className="flex justify-center mb-10 flex-col items-center gap-5">
        <Text
          fontWeight={"light"}
          letterSpacing={"5px"}
          fontSize={{ lg: "xx-large", base: "large", md: "x-large" }}
        >
          KATEGORI PRODUK UNGGULAN
        </Text>
        <Divider width={"50%"} />
      </div>
      <Grid
        templateColumns={{
          lg: "repeat(3, 1fr)",
          md: "repeat(2, 1fr)",
          base: "repeat(2, 1fr)",
        }}
      >
        {popularCategory.map((category, index) => (
          <Center
            position={"relative"}
            height={{ lg: "300px", md: "300px", base: "100px" }}
            backgroundImage={category.pictureLink}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            key={index}
            zIndex={2}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              backgroundColor={`${famousCategories[index].color} 0.8)`}
              _hover={{
                backgroundColor: `${famousCategories[index].color} 0.1)`,
              }}
              zIndex="1"
            />
            <Box
              position="relative"
              zIndex="2"
              className="flex flex-col items-center gap-4"
            >
              <Text
                color={"white"}
                letterSpacing={"2px"}
                fontSize={{ large: "x-large", base: "large" }}
                fontWeight={"bold"}
              >
                {category.name}
              </Text>
              {user != null && user.userRole == Settings.ADMIN && (
                <>
                  <ChangeCategoryProductImage popularCategory={category} />
                </>
              )}
            </Box>
          </Center>
        ))}
      </Grid>
    </div>
  );
}
