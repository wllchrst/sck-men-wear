import { PopularCategory } from "../interfaces/popular-category-interface";
import FirebaseHelper from "../services/firebase-helper";
import { popularCategoryCollection } from "../settings/firebase-config";

const firebaseHelper = new FirebaseHelper<PopularCategory>();

async function changeImageLink(imageLink: string, categoryName: string){
    try {
        const popularCategory = await firebaseHelper.getByColumn(popularCategoryCollection, "categoryName", categoryName)

        if(popularCategory == null || popularCategory == undefined) {
            console.log("Something went wrong")
            return false;
        }    

        popularCategory.pictureLink = imageLink;

        await firebaseHelper.update(popularCategory.id, popularCategory, popularCategoryCollection)
        return true;
    } catch (error) {
        console.error(error)
        return false
    }
}

export { changeImageLink }