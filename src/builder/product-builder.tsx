import { v4 } from "uuid";
import { ICSVRow } from "../interfaces/csv-interface";
import { Product } from "../interfaces/product-interface";
import { PRODUCT_DATA } from "../enums/product-data-enum";

export function productBuilder(
  data: ICSVRow,
  categoryId: string,
  subCategoryId: string
): Product | null {
  try {
    const product: Product = {
      id: v4(),
      productName: data[PRODUCT_DATA.productName].trim(),
      description: data[PRODUCT_DATA.description].trim(),
      pictureLink: getImageLink(data[PRODUCT_DATA.pictureLink].trim()),
      productItems: [{
        price: getPrice(data[PRODUCT_DATA.price]),
        size: data[PRODUCT_DATA.size]
      }],
      color: data[PRODUCT_DATA.color],
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      discount: getFloat(data[PRODUCT_DATA.discount]),
      rating: getFloat(data[PRODUCT_DATA.rating]),
      piecesPerPrice: getPrice(data[PRODUCT_DATA.piecesPerPrice]),
      isNew: data[PRODUCT_DATA.productType].includes("N"),
      onPromo: data[PRODUCT_DATA.productType].includes("P"),
      onSale: data[PRODUCT_DATA.productType].includes("S"),
    };

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function getFloat(rating: string) {
  rating = rating.trim().replace(",", ".").replace("%", "");
  console.log("rating " + rating);

  return parseFloat(rating);
}

function getPrice(price: string): number {
  price = price.replace(".", "").trim();

  return parseInt(price);
}

function getImageLink(url: string): string {
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000` : "";
}
