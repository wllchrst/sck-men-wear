import { useEffect, useState } from "react";
import { ICSVRow } from "../interfaces/csv-interface";
import FirebaseHelper from "../services/firebase-helper";
import { Product } from "../interfaces/product-interface";
import {
  categoryCollection,
  productCollection,
  subCategoryCollection,
} from "../settings/firebase-config";
import { Category } from "../interfaces/category-interface";
import { v4 } from "uuid";

export default class UpdateProductCSVHandler {
  firebaseHelper: FirebaseHelper<Product>;
  categoryFirebaseHelper: FirebaseHelper<Category>;
  categoryList: Category[] = [];
  subCategoryList: Category[] = [];

  constructor() {
    this.firebaseHelper = new FirebaseHelper();
    this.categoryFirebaseHelper = new FirebaseHelper();
  }

  useUpdateCSV() {
    const [csvProducts, setCsvProducts] = useState<ICSVRow[]>([]);

    useEffect(() => {
      console.log(csvProducts);
    }, [csvProducts]);

    function update() {
      if (csvProducts.length <= 0) {
        alert("Upload terlebih dahulu datanya");
        return;
      }
    }

    return { setCsvProducts, update };
  }

  async uploadData(listOfData: ICSVRow[]) {
    const products: Product[] = [];
    this.categoryList =
      await this.categoryFirebaseHelper.getAll(categoryCollection);
    this.subCategoryList = await this.categoryFirebaseHelper.getAll(
      subCategoryCollection
    );

    for (const data of listOfData) {
      const category = data[PRODUCT_DATA.category];
      const subCategory = data[PRODUCT_DATA.sub_category];

      this.uploadCategory(category);
      this.uploadSubCategory(subCategory);
    }
  }

  async uploadNewProducts(): Promise<Boolean> {}

  async uploadCategory(category: string): Promise<Category> {
    for (const categoryInformation of this.categoryList) {
      if (category === categoryInformation.name) return categoryInformation;
    }

    const categoryInformation: Category = {
      id: v4(),
      name: category,
    };

    this.categoryFirebaseHelper.create(categoryCollection, categoryInformation);
    return categoryInformation;
  }

  async uploadSubCategory(subCategory: string): Promise<Category> {
    for (const categoryInformation of this.subCategoryList) {
      if (subCategory === categoryInformation.name) return categoryInformation;
    }

    const categoryInformation: Category = {
      id: v4(),
      name: subCategory,
    };

    this.categoryFirebaseHelper.create(
      subCategoryCollection,
      categoryInformation
    );
    return categoryInformation;
  }
}
