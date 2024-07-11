import { Text } from "@chakra-ui/react";
import { Product } from "../interfaces/product-interface";
import { FaStar } from "react-icons/fa";

interface I {
  product: Product;
}
export default function ProductRating({ product }: I) {
  const xs = [];
  const ratingAmount = Math.ceil(product.rating);

  for (let i = 0; i < ratingAmount; i++) {
    xs.push(i);
  }

  return (
    <div className="flex gap-3 items-center">
      <div className="gap-1 flex">
        {xs.map((_, index) => (
          <div key={index} className="">
            <FaStar className=""></FaStar>
          </div>
        ))}
      </div>

      <Text fontWeight={"bold"}>{product.rating}</Text>
    </div>
  );
}
