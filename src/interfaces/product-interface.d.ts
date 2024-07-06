import { IProductItem } from "./product-item-interface";

export interface Product {
  id: string;
  productName: string;
  description: string;
  pictureLink: string;

  color: string;

  categoryId: string;
  subCategoryId: string;

  discount: number;
  rating: number;
  piecesPerPrice: number;
  productItems : IProductItem[]

  // product status
  onPromo: boolean;
  onSale: boolean;
  isNew: boolean;
}
