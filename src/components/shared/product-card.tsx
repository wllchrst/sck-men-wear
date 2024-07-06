import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Product } from "../../interfaces/product-interface";
import UpdateProduct from "./update-product";
import { Settings } from "../../settings/settings";
import ProductCardFloating from "./product-card-floating";

interface Props {
  product: Product;
  isAdmin: boolean;
  deleteHandle: (product: Product) => void;
}

export default function ProductCard({ product, isAdmin, deleteHandle }: Props) {
  return (
    <div>
      <Card className="relative">
        <CardBody border={''}>
          <ProductCardFloating product={product}/>
          <Image src={product.pictureLink} />
          <Stack mt="6" spacing="3">
            <Heading
              noOfLines={1}
              size="md"
              _hover={{
                textDecor: "underline",
              }}
            >
              {product.productName}
            </Heading>
            <Text noOfLines={3} height={'70px'}>
              {product.description}
              {Settings.PRODUCT_DESC_HELPER}
            </Text>
            <Flex justifyContent={"space-between"}>
              <Text
                color="blue.600"
                fontSize="2xl"
                className="flex gap-2 items-center"
              >
                Rp.{product.productItems[0].price}
                <Badge colorScheme="cyan">{product.rating}</Badge>
              </Text>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => deleteHandle(product)}
                    colorScheme="red"
                  >
                    X
                  </Button>
                  <UpdateProduct product={product} />
                </div>
              )}
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}
