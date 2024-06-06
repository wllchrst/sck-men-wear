import { Divider, Grid, Text } from "@chakra-ui/react";
import useFetchTopProducts from "../../hooks/use-fetch-top-products";
import ProductCard from "./product-card";

export default function ProdukUnggulan() {
  const { products, isLoading } = useFetchTopProducts();

  return (
    <div>
      <div className="flex justify-center mb-10 flex-col items-center gap-5">
        <Text
          fontWeight={"light"}
          letterSpacing={"5px"}
          fontSize={{ lg: "xx-large", base: "large", md: "x-large" }}
        >
          PRODUK UNGGULAN
        </Text>
        <Divider width={"50%"} />
      </div>
      <Grid
        paddingX={{ base: 5, lg: 12, md: 20 }}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gridGap={5}
      >
        {products.map((product, index) => (
          <div key={index}>
            <ProductCard
              isAdmin={false}
              deleteHandle={() => {}}
              product={product}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
}
