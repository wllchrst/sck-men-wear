import { useParams } from "react-router-dom";
import FetchBuilder from "../builder/fetch-builder";
import { productCollection } from "../settings/firebase-config";
import { query, where } from "firebase/firestore";
import Loading from "../components/global/loading";
import { Product } from "../interfaces/product-interface";

const fetchBuilder = new FetchBuilder<Product>();

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = fetchBuilder.getOne(
    query(productCollection, where("id", "==", id))
  );
  if (isLoading || data == null) return <Loading />;
  return <div>{data.productName}</div>;
}


