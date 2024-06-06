import { Promotion } from "../interfaces/promotion-interface";
import FirebaseHelper from "../services/firebase-helper";
import { promotionCollection } from "../settings/firebase-config";

async function createPromotion(promotion: Promotion) {
  const helper = new FirebaseHelper<Promotion>();
  const success = await helper.create(promotionCollection, promotion);

  return success;
}

export { createPromotion };
