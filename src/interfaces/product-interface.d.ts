export interface Product {
  id: string;
  name: string;
  description: string;
  pictureLink: string;
  price: number;
  categoryId: string;
  discount: number;
  rating: number;
  onPromo: boolean;
  onSale: boolean;
  isNew: boolean;
}
