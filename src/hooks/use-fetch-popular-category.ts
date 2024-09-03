import { useEffect, useState } from "react";
import { PopularCategory } from "../interfaces/popular-category-interface";
import { onSnapshot, query } from "firebase/firestore";
import { popularCategoryCollection } from "../settings/firebase-config";

export default function useFetchPopularCategories() {
  const [popularCategory, setPopularCategory] = useState<PopularCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAll() {
    try {
      const q = query(popularCategoryCollection);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs[0] != undefined) {
          setPopularCategory(
            snapshot.docs.map((doc) => doc.data()) as PopularCategory[]
          );
          setIsLoading(false);
        } else {
          setPopularCategory([]);
          setIsLoading(false);false
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

  return { popularCategory, isLoading };
}
