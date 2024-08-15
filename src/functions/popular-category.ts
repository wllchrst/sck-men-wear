import { PopularCategory } from "../interfaces/popular-category-interface";
import FirebaseHelper from "../services/firebase-helper";
import { popularCategoryCollection } from "../settings/firebase-config";

const firebaseHelper = new FirebaseHelper<PopularCategory>();

async function changeImageLink(imageLink: string, id: string) {
  console.log(id);
  try {
    const popularCategory = await firebaseHelper.getById(
      popularCategoryCollection,
      id
    );

    console.log(popularCategory);

    if (popularCategory == null || popularCategory == undefined) {
      console.log("Something went wrong");
      return false;
    }

    popularCategory.pictureLink = imageLink;

    await firebaseHelper.update(
      popularCategory.id,
      popularCategory,
      popularCategoryCollection
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { changeImageLink };
