export interface Product {
  id: string;
  name: string;
  description: string;
  pictureLink: string;
  price: number;
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
