export interface Product {
  sId: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  offerPrice: number;
  images: { url: string }[];
}