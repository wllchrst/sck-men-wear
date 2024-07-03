import { v4 } from "uuid";
import { ICSVRow } from "../interfaces/csv-interface";
import { Product } from "../interfaces/product-interface";

function productBuilder(
  data: ICSVRow,
  categoryId: string,
  subCategoryId: string
): Product {
  const product: Product = {
    id: v4(),
    productName: data[PRODUCT_DATA.productName].trim(),
    description: data[PRODUCT_DATA.description].trim(),
    pictureLink: getImageLink(data[PRODUCT_DATA.pictureLink].trim()),
    price: getPrice(data[PRODUCT_DATA.price]),
    color: data[PRODUCT_DATA.color],
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    discount: getPrice(data[PRODUCT_DATA.discount]),
    rating: getPrice(data[PRODUCT_DATA.rating]),
    piecesPerPrice: getPrice(data[PRODUCT_DATA.piecesPerPrice]),
    size: data[PRODUCT_DATA.size],
    isNew: data[PRODUCT_DATA.productType].includes("N"),
    onPromo: data[PRODUCT_DATA.productType].includes("P"),
    onSale: data[PRODUCT_DATA.productType].includes("S"),
  };

  return product;
}

function getPrice(price: string): number {
  price.replace(".", "");
  price.trim();

  return parseInt(price);
}

function getImageLink(driveLink: string): string {
  // Regular expression to extract the file ID from the Google Drive link
  const fileIdMatch = driveLink.match(/\/d\/(.+?)\//);
  if (!fileIdMatch || fileIdMatch.length < 2) {
    throw new Error("Invalid Google Drive link");
  }

  const fileId = fileIdMatch[1];
  // Construct the direct download link
  const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;

  return directLink;
}
