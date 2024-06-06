import { Skeleton, Stack, Text } from "@chakra-ui/react";
import CreateProduct from "../components/shared/create-product";
import ProductsView from "../components/shared/products-view";
import CreateCategory from "../components/shared/create-category";

export default function ManageProduct() {
  return (
    <div className="p-5">
      <div className="flex justify-center items-center">
        <Text fontSize={"x-large"}>Kelola Produk</Text>
      </div>
      <div className="flex gap-3">
        <CreateProduct />
        <CreateCategory />
      </div>
      <ProductsView withFilter={true} isAdmin={true} />
    </div>
  );
}
