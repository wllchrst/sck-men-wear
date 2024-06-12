import { Product } from "../interfaces/product-interface";
import FirebaseHelper from "../services/firebase-helper";
import { productCollection } from "../settings/firebase-config";

const helper = new FirebaseHelper<Product>();

function validateProductCreation(product: Product): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof product.id !== "string" || product.id.trim() === "") {
    errors.push("Invalid id: must be a non-empty string.");
  }

  if (typeof product.name !== "string" || product.name.trim() === "") {
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

  if (product.price <= 0) {
    console.log(`price : ${product.price}`);
    errors.push("Invalid price: must be a positive number.");
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

export { createProduct, deleteProduct, validateProductCreation };
