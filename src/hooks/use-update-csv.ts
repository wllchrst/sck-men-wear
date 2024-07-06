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
  csvRow: ICSVRow[] = []

  constructor() {
    this.firebaseHelper = new FirebaseHelper();
    this.categoryFirebaseHelper = new FirebaseHelper();
    this.subCategoryFirebaseHelper = new FirebaseHelper();
  }

  useUpdateCSV() {
    const [csvProducts, setCsvProducts] = useState<ICSVRow[]>([]);

    useEffect(() => {
      this.csvRow = csvProducts
    }, [csvProducts]);

    return { setCsvProducts };
  }

  async update(){
    if(this.csvRow.length <= 0) alert("Upload CSV Terlebih Dahulu")

    this.uploadData(this.csvRow)
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
      const subCategory = await this.uploadSubCategory(subCategoryData, category.id);

      this.categoryList.push(category)
      this.subCategoryList.push(subCategory)

      const productCreation = await this.uploadNewProducts(data, category.id, subCategory.id)

      if(!productCreation) return false
    }

    return true
  }

  async uploadNewProducts(data: ICSVRow, categoryId: string, subCategoryId: string): Promise<Boolean> {
    const product = productBuilder(data, categoryId, subCategoryId)

    if(product == null) return false

    const findProduct = await this.firebaseHelper.getByColumn(productCollection, "productName", product.productName)
    if(findProduct != null) {
      findProduct.productItems.push(product.productItems[0])
      const creationResult = await this.firebaseHelper.update(findProduct.id, findProduct, productCollection)
      return creationResult
    }

    const result = await this.firebaseHelper.create(productCollection, product)

    return result;
  }

  async uploadCategory(category: string): Promise<Category> {
    category = category.trim()
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

  async uploadSubCategory(subCategory: string, categoryId: string): Promise<SubCategory> {
    subCategory = subCategory.trim()
    for (const categoryInformation of this.subCategoryList) {
      if (subCategory === categoryInformation.name) return categoryInformation;
    }

    const categoryInformation: SubCategory = {
      id: v4(),
      name: subCategory,
      categoryId: categoryId
    };

    this.categoryFirebaseHelper.create(
      subCategoryCollection,
      categoryInformation
    );

    return categoryInformation;
  }
}