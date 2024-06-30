import { useEffect, useState } from "react";
import { ICSVRow } from "../interfaces/csv-interface";
import FirebaseHelper from "../services/firebase-helper";
import { Product } from "../interfaces/product-interface";
import { productCollection } from "../settings/firebase-config";

export default class UpdateProductCSVHandler {
  firebaseHelper: FirebaseHelper<Product>;

  constructor() {
    this.firebaseHelper = new FirebaseHelper();
  }

  useUpdateCSV() {
    const [csvProducts, setCsvProducts] = useState<ICSVRow[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      console.log(csvProducts);
    }, [csvProducts]);

    function processData() {
        for(const data of csvProducts) {
            data['']
        }
    }

    function update() {
      if (csvProducts.length <= 0) {
        alert("Upload terlebih dahulu datanya");
        return;
      }
    }

    return { setCsvProducts, update };
  }

  async uploadNewProducts(products: Product[]): Promise<Boolean> {
    for (const product of products) {
      const result = await this.firebaseHelper.create(
        productCollection,
        product
      );
      if (!result) return false;
    }

    return true;
  }
}
