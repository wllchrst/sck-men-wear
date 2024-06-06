import { Box, Grid } from "@chakra-ui/react";
import Loading from "../components/global/loading";
import ProductCard from "../components/shared/product-card";
import ProductFilter from "../components/shared/product-filter";
import useFetchProductsFiltered from "../hooks/use-fetch-products-filtered";

export default function Products() {
  const { filteredProducts, isLoading, setFilter, resetFilter } =
    useFetchProductsFiltered();
  if (isLoading) return <Loading />;
  return (
    <Box padding={5}>
      <ProductFilter
        resetFilter={resetFilter}
        setFilter={setFilter}
      ></ProductFilter>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gridGap={"20px"}
        paddingTop={4}
      >
        {filteredProducts.map((product, index) => (
          <div key={index}>
            <ProductCard
              isAdmin={false}
              deleteHandle={() => {}}
              product={product}
              key={index}
            ></ProductCard>
          </div>
        ))}
      </Grid>
    </Box>
  );
}
