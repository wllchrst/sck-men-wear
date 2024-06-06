import { useEffect, useState } from "react";
import { Promotion } from "../interfaces/promotion-interface";
import FirebaseHelper from "../services/firebase-helper";
import { promotionCollection } from "../settings/firebase-config";
import { onSnapshot, query } from "firebase/firestore";

export default function useFetchPromotion() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAll() {
    try {
      const q = query(promotionCollection);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs[0] != undefined) {
          setPromotions(snapshot.docs.map((doc) => doc.data()) as Promotion[]);
          setIsLoading(false);
        } else {
          setPromotions([]);
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

  return { promotions, isLoading };
}
