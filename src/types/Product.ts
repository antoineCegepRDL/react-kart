import Brand from "./Brand";

export default interface Item {
  id: string;
  price: number;
  isDiscount: boolean;
  discountPercentage: number;
  imageUrl: string;
  quantity: number;
  quantityToBuy: number;
  name: string;
  description: string;
  brand: Brand;
  brandId: string;
}