import { useEffect, useState } from "react";
import { Product } from "../interfaces/product-interface";
import { limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { productCollection } from "../settings/firebase-config";
import { Settings } from "../settings/settings";

export default function useFetchTopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAll() {
    try {
      const q = query(
        productCollection,
        orderBy("rating", "desc"),
        limit(Settings.TOP_AMOUNT_PRODUCTS)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs[0] != undefined) {
          setProducts(snapshot.docs.map((doc) => doc.data()) as Product[]);
          setIsLoading(false);
        } else {
          setProducts([]);
          setIsLoading(false);
        }
      });

      // Clean up the listener when component unmounts
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return { products, isLoading };
}
