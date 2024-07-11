import { useEffect, useState } from "react";
import { Product } from "../interfaces/product-interface";
import { limit, onSnapshot, query } from "firebase/firestore";
import { productCollection } from "../settings/firebase-config";
import { Settings } from "../settings/settings";

export default function useFetchProducts() {
  
  const [fetchProducts, setFetchProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAll() {
    try {
      const q = query(productCollection, limit(Settings.LIMIT_FETCH_PRODUCT));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs[0] != undefined) {
          setFetchProducts(snapshot.docs.map((doc) => doc.data()) as Product[]);
          setIsLoading(false);
        } else {
          setFetchProducts([]);
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
    console.log(fetchProducts.length)
  }, [fetchProducts])

  useEffect(() => {
    getAll();
  }, []);

  return { products, setProducts, isLoading };
}
