import { Product } from "../interfaces/product-interface";
import FirebaseHelper from "../services/firebase-helper";
import { categoryCollection, productCollection, subCategoryCollection } from "../settings/firebase-config";
import { IResponse, createResponse } from "../interfaces/response-interface";

const helper = new FirebaseHelper<Product>();

async function deleteAllProduct(): Promise<IResponse>{
  try {
    const result = await helper.deleteAll(productCollection)
    const categoryResult = await helper.deleteAll(categoryCollection)
    const subResult = await helper.deleteAll(subCategoryCollection)

    const success = result && categoryResult && subResult
    const message = success ? "Failed" : "Success" + "Delete Semua Produk"
    return createResponse(message, success)
  } catch (error) {
    console.log(error)
    return createResponse("Gagal delete semua produk", false)
  }
}

function validateProductCreation(product: Product): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof product.id !== "string" || product.id.trim() === "") {
    errors.push("Invalid id: must be a non-empty string.");
  }

  if (
    typeof product.productName !== "string" ||
    product.productName.trim() === ""
  ) {
    errors.push("Invalid name: must be a non-empty string.");
  }

  if (
    typeof product.description !== "string" ||
    product.description.trim() === ""
  ) {
    errors.push("Invalid description: must be a non-empty string.");
  }

  if (
    typeof product.pictureLink !== "string" ||
    product.pictureLink.trim() === ""
  ) {
    errors.push("Invalid pictureLink: must be a non-empty string.");
  } else {
    // Optionally, add more validation for URL format
    try {
      new URL(product.pictureLink);
    } catch {
      errors.push("Invalid pictureLink: must be a valid URL.");
    }
  }

  for(const item of product.productItems) {
    if(item.price <= 0){
      console.log(`price : ${item.price}`);
      errors.push("Invalid price: must be a positive number.");
    }
  }

  if (
    typeof product.categoryId !== "string" ||
    product.categoryId.trim() === ""
  ) {
    errors.push("Invalid categoryId: must be a non-empty string.");
  }

  if (
    typeof product.discount !== "number" ||
    product.discount < 0 ||
    product.discount > 100
  ) {
    errors.push("Invalid discount: must be a number between 0 and 100.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

async function createProduct(product: Product) {
  const result = await helper.create(productCollection, product);
  return result;
}

async function deleteProduct(id: string) {
  const result = await helper.deleteById(productCollection, id);
  return result;
}

async function updateProduct(id: string, product: Product) {}

export { createProduct, deleteProduct, validateProductCreation, deleteAllProduct };
