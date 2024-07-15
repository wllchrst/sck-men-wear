import { Box, Grid } from "@chakra-ui/react";
import Loading from "../components/global/loading";
import ProductCard from "../components/shared/product-card";
import ProductFilter from "../components/shared/product-filter";
import useFetchProductsFiltered from "../hooks/use-fetch-products-filtered";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

export default function Products() {
  const { filteredProducts, isLoading, setFilter, resetFilter } =
    useFetchProductsFiltered();

  const chunkSize = 12;
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(filteredProducts.slice(0, chunkSize));

  function reset() {
    resetFilter();
    const getItem = filteredProducts.slice(0, chunkSize);
    setItems(getItem);
    setHasMore(true);
  }

  useEffect(() => {
    const getItem = filteredProducts.slice(0, chunkSize);
    setItems(getItem);
  }, [filteredProducts]);

  function getMoreData() {
    const currentLength = items.length;
    const nextItems = filteredProducts.slice(
      currentLength,
      currentLength + chunkSize
    );

    setItems([...items, ...nextItems]);

    if (items.length >= filteredProducts.length) setHasMore(false);
  }

  if (isLoading) return <Loading />;
  return (
    <Box padding={5}>
      <ProductFilter resetFilter={reset} setFilter={setFilter}></ProductFilter>
      <InfiniteScroll
        dataLength={items.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<></>}
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
          {items.map((product, index) => (
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
    </Box>
  );
}
