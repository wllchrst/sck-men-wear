export interface Product {
  id: string;
  productName: string;
  description: string;
  pictureLink: string;
  price: number;
  color: string;

  categoryId: string;
  subCategoryId: string;

  discount: number;
  rating: number;
  piecesPerPrice: number;
  size: string;

  // product status
  onPromo: boolean;
  onSale: boolean;
  isNew: boolean;
}
