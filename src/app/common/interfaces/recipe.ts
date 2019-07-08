import { Nutrition } from './nutrition';
import { Ingredient } from './ingredient';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  products: Ingredient[];
  recipes: Recipe[];
  nutrition: Nutrition;
  user: string;
  userID: string;
  // createdOn: Date;
}
