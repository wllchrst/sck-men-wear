import { Box, Grid } from "@chakra-ui/react";
import Loading from "../components/global/loading";
import ProductCard from "../components/shared/product-card";
import ProductFilter from "../components/shared/product-filter";
import useFetchProductsFiltered from "../hooks/use-fetch-products-filtered";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function Products() {
  const { filteredProducts, isLoading, setFilter, resetFilter } =
    useFetchProductsFiltered();
  if (isLoading) return <Loading />;

  const chunkSize = 20;
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(filteredProducts.slice(0, chunkSize));

  function getMoreData() {}

  return (
    <Box padding={5}>
      <ProductFilter
        resetFilter={resetFilter}
        setFilter={setFilter}
      ></ProductFilter>

      {/* bagian buat kasih liat product nya */}
      <InfiniteScroll
        dataLength={items.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<Loading/>}
      >
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
      </InfiniteScroll>

      {/* <ProductPagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageAmount={pageAmount} before={before} after={after}></ProductPagination> */}
    </Box>
  );
}
