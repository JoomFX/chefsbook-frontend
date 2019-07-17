import { Product } from './product';

export interface Ingredient {
  product: Product;
  amount?: number;
  measure?: string;
  quantity?: number;
  unit?: string;
}
