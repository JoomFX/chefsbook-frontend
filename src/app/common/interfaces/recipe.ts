import { Nutrition } from './nutrition';
import { Ingredient } from './ingredient';
import { Category } from './category';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: Category;
  products: Ingredient[];
  recipes: Recipe[];
  recipe?: Recipe;
  subrecipes?: Recipe[];
  nutrition: Nutrition;
  user: string;
  userID: string;
  created: Date;
}
