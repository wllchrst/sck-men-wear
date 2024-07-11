import { useParams } from "react-router-dom";
import FetchBuilder from "../builder/fetch-builder";
import { productCollection } from "../settings/firebase-config";
import { query, where } from "firebase/firestore";
import Loading from "../components/global/loading";
import { Product } from "../interfaces/product-interface";
import { Box, Heading, Image, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatPrice } from "../services/helper";
import ProductDetailBadge from "./product-detail-badge";
import ProductDetailSize from "./product-detail-size";
import { IProductItem } from "../interfaces/product-item-interface";
import ProductRating from "./product-rating";
import pictureNotAvailable from "../assets/picture-not-available.png";

const fetchBuilder = new FetchBuilder<Product>();

export default function ProductDetailPage() {
  const [productItem, setProductItem] = useState<IProductItem>(
    {} as IProductItem
  );
  const { id } = useParams();
  const { data, isLoading } = fetchBuilder.getOne(
    query(productCollection, where("id", "==", id))
  );

  useEffect(() => {
    const productItem = data?.productItems[0];
    if (productItem) setProductItem(productItem);
  }, [isLoading]);

  if (isLoading || data == null) return <Loading />;
  return (
    <Box className="w-full py-10 flex px-16">
      <Box className="w-1/3">
        <Image src={data.pictureLink} fallbackSrc={pictureNotAvailable} />
      </Box>
      <Box className="w-2/3 p-3">
        <div className="flex items-center gap-3">
          <Heading fontSize={"x-large"}>{data.productName}</Heading>
          <ProductDetailBadge product={data} />
        </div>
        <ProductRating product={data} />
        <Text fontSize={"x-large"} fontWeight={"bold"}>
          {formatPrice(productItem.price)}
        </Text>
        <Spacer height={"20px"}></Spacer>
        <Text fontSize={"small"} noOfLines={3}>
          {data.description}
        </Text>
        <Spacer height={"20px"}></Spacer>
        <ProductDetailSize
          product={data}
          productItem={productItem}
          setProductItem={setProductItem}
        />
      </Box>
    </Box>
  );
}
