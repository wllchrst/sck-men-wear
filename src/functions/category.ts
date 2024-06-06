import { Category } from "../interfaces/category-interface";
import FirebaseHelper from "../services/firebase-helper";
import { categoryCollection } from "../settings/firebase-config";

const helper = new FirebaseHelper<Category>();

function validateCategoryCreation(category: Category): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (typeof category.id !== "string" || category.id.trim() === "") {
    errors.push("Invalid id: must be a non-empty string.");
  }

  if (typeof category.name !== "string" || category.name.trim() === "") {
    errors.push("Invalid name: must be a non-empty string.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

async function createCategory(category: Category) {
  const result = helper.create(categoryCollection, category);
  return result;
}

export { createCategory, validateCategoryCreation };
