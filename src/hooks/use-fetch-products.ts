import { useEffect, useState } from "react";
import { Product } from "../interfaces/product-interface";
import { collectionGroup, onSnapshot, query } from "firebase/firestore";
import { productCollection } from "../settings/firebase-config";

export default function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAll() {
    try {
      const q = query(productCollection);

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

  return { products, setProducts, isLoading };
}
