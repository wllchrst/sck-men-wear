import { useEffect, useState } from "react";
import useFetchProducts from "./use-fetch-products";
import { FilterProduct } from "../interfaces/filter-products-interface";
import { Product } from "../interfaces/product-interface";

export default function useFetchProductsFiltered() {
  const { products, setProducts, isLoading } = useFetchProducts();
  const [filteredProducts, setfilteredProducts] = useState<Product[]>(products);
  const [filter, setFilter] = useState({
    categoriesId: "",
    search: "",
  } as FilterProduct);

  function resetFilter() {
    setFilter({ categoriesId: "", search: "" });
  }

  function filterProduct() {
    const filtered = products.filter((product) => {
      if (filter.categoriesId == "" && filter.search == "") return true;
      var passValidation = true;

      if (
        product.categoryId != filter.categoriesId &&
        filter.categoriesId != ""
      )
        passValidation = false;

      return passValidation;
    });

    setfilteredProducts(filtered);
  }

  useEffect(() => {
    filterProduct();
  }, [filter, isLoading]);

  return { filteredProducts, isLoading, resetFilter, setFilter };
}
