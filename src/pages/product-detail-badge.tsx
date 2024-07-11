import { Badge } from "@chakra-ui/react";
import { Product } from "../interfaces/product-interface";

interface I {
  product: Product;
}
export default function ProductDetailBadge({ product }: I) {
  return (
    <div className="flex gap-2">
      {product.onSale && (
        <Badge colorScheme="cyan" variant={"solid"}>
          Sale
        </Badge>
      )}
      {product.isNew && (
        <Badge colorScheme="purple" variant={"solid"}>
          New
        </Badge>
      )}
      {product.onPromo && (
        <Badge colorScheme="green" variant={"solid"}>
          Promo
        </Badge>
      )}
    </div>
  );
}
