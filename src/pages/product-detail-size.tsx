import { Button } from "@chakra-ui/react";
import { Product } from "../interfaces/product-interface";
import { IProductItem } from "../interfaces/product-item-interface";

interface I {
  product: Product;
  productItem: IProductItem;
  setProductItem: React.Dispatch<React.SetStateAction<IProductItem>>;
}

export default function ProductDetailSize({
  product,
  productItem,
  setProductItem,
}: I) {
  return (
    <div className="flex gap-2">
      {product.productItems.map((product, index) => (
        <div key={index}>
          <Button
            variant={
              product.size == productItem.size &&
              product.piecesPerPrice == productItem.piecesPerPrice
                ? "solid"
                : "outline"
            }
            colorScheme="teal"
            onClick={() => {
              setProductItem(product);
            }}
          >
            {`${product.size} - ${product.piecesPerPrice} pcs`}
          </Button>
        </div>
      ))}
    </div>
  );
}
