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
import { productBuilder } from "../builder/product-builder";
import { PRODUCT_DATA } from "../enums/product-data-enum";
import { SubCategory } from "../interfaces/sub-category-interface";

export default class UpdateProductCSVHandler {
  firebaseHelper: FirebaseHelper<Product>;
  categoryFirebaseHelper: FirebaseHelper<Category>;
  subCategoryFirebaseHelper: FirebaseHelper<SubCategory>;
  categoryList: Category[] = [];
  subCategoryList: SubCategory[] = [];
  csvRow: ICSVRow[] = [];
  products: Map<string, Product> = new Map();
  names: Map<string, boolean> = new Map();

  constructor() {
    this.firebaseHelper = new FirebaseHelper();
    this.categoryFirebaseHelper = new FirebaseHelper();
    this.subCategoryFirebaseHelper = new FirebaseHelper();
  }

  useUpdateCSV() {
    const [csvProducts, setCsvProducts] = useState<ICSVRow[]>([]);

    useEffect(() => {
      this.csvRow = csvProducts;
    }, [csvProducts]);

    return { setCsvProducts };
  }

  async update() {
    if (this.csvRow.length <= 0) alert("Upload CSV Terlebih Dahulu");

    this.uploadData(this.csvRow);
  }

  async uploadData(listOfData: ICSVRow[]): Promise<boolean> {
    this.categoryList =
      await this.categoryFirebaseHelper.getAll(categoryCollection);
    this.subCategoryList = await this.subCategoryFirebaseHelper.getAll(
      subCategoryCollection
    );

    for (const data of listOfData) {
      const categoryData = data[PRODUCT_DATA.category];
      const subCategoryData = data[PRODUCT_DATA.sub_category];

      const category = await this.uploadCategory(categoryData);

      if(category == null) continue;
      const subCategory = await this.uploadSubCategory(
        subCategoryData,
        category.id
      );

      this.categoryList.push(category);
      this.subCategoryList.push(subCategory);

      const product = productBuilder(data, category.id, subCategory.id);

      if (product == null) continue;

      if (this.products.get(product.productName)) {
        this.products
          .get(product.productName)
          ?.productItems.push(product.productItems[0]);
        continue;
      }
      this.products.set(product.productName, product);
    }

    return await this.uploadNewProducts();
  }

  async uploadNewProducts() {
    console.log(this.products);
    for (const [_, product] of this.products) {
      const result = await this.firebaseHelper.create(
        productCollection,
        product
      );

      if (!result) return result;
    }

    return true;
  }

  async uploadCategory(category: string): Promise<Category | null> {
    try {
      category = category.trim();
      for (const categoryInformation of this.categoryList) {
        if (category === categoryInformation.name) return categoryInformation;
      }

      const categoryInformation: Category = {
        id: v4(),
        name: category,
      };

      this.categoryFirebaseHelper.create(categoryCollection, categoryInformation);
      return categoryInformation;
    } catch (error) {
      console.log(error)
      return null
    }
    
  }

  async uploadSubCategory(
    subCategory: string,
    categoryId: string
  ): Promise<SubCategory> {
    subCategory = subCategory.trim();
    for (const categoryInformation of this.subCategoryList) {
      if (subCategory === categoryInformation.name) return categoryInformation;
    }

    const categoryInformation: SubCategory = {
      id: v4(),
      name: subCategory,
      categoryId: categoryId,
    };

    this.categoryFirebaseHelper.create(
      subCategoryCollection,
      categoryInformation
    );

    return categoryInformation;
  }
}
