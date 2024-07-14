import { useEffect, useState } from "react";
import { Product } from "../interfaces/product-interface";
import { limit, onSnapshot, query } from "firebase/firestore";
import { productCollection } from "../settings/firebase-config";
import { Settings } from "../settings/settings";

export default function useFetchProducts() {
  const [pageAmount, setPageAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
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

  function setPage(pageTarget: number){
    setCurrentPage(pageTarget)
    const totalLen = fetchProducts.length

    const getProducts : Product[] = []
    for(let i = pageTarget * Settings.PRODUCT_PER_PAGE; 
      i < pageTarget * Settings.PRODUCT_PER_PAGE + Settings.PRODUCT_PER_PAGE && i < totalLen;
      i++) {
      getProducts.push(fetchProducts[i])
    }
    setProducts(getProducts)
  }

  function before(){
    if(currentPage == 0) return;
    const page = currentPage - 1;
    setPage(page);
  }

  function after(){
    if(currentPage >= pageAmount - 1) return;
    const page = currentPage + 1;
    setPage(page)
  }

  function getProductForPage(){
    const getProduct: Product[] = []
    for(let i = 0 ; i < Settings.PRODUCT_PER_PAGE; i++) {
      const product = fetchProducts[i];
      getProduct.push(product);
    }
    setProducts(getProduct);
  }

  useEffect(() => {
    if(fetchProducts.length <= 0) return;
    setPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    if(fetchProducts.length <= 0) return;

    setProducts(fetchProducts)
    
    // setPageAmount(Math.ceil(fetchProducts.length / Settings.PRODUCT_PER_PAGE))
    // getProductForPage();
  }, [fetchProducts])

  useEffect(() => {
    getAll();
  }, []);

  return { products, setProducts, isLoading, before, after, pageAmount, setCurrentPage, currentPage};
}
