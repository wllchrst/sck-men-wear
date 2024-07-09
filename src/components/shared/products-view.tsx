import {
  Grid,
} from "@chakra-ui/react";
import useFetchProducts from "../../hooks/use-fetch-products";
import Loading from "../global/loading";
import { Product } from "../../interfaces/product-interface";
import { deleteProduct } from "../../functions/product";
import ProductCard from "./product-card";
import { ToastBuilder } from "../../builder/toast-builder";

interface Props {
  isAdmin: boolean;
  withFilter: boolean;
}

export default function ProductsView({ isAdmin }: Props) {
  const { isLoading, products } = useFetchProducts();
  const toastBuilder = new ToastBuilder("Deleting Product");

  function deleteHandle(product: Product) {
    if (!confirm("You sure you want to delete this product")) return;
    toastBuilder.infoToast("Please wait a moment");
    deleteProduct(product.id).then((result) => {
      toastBuilder.closeAllToast();
      if (result) toastBuilder.successToast("Success deleting product");
      else toastBuilder.failedToast("Something went wrong");
    });
  }

  if (isLoading) return <Loading />;
  return (
    <>
      <Grid
        padding={4}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gridGap={"2rem"}
      >
        {products.map((product, index) => (
          <>
            <ProductCard
              product={product}
              deleteHandle={deleteHandle}
              isAdmin={isAdmin}
              key={index}
            />
          </>
        ))}
      </Grid>
    </>
  );
}
