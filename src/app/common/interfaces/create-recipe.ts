import { Nutrition } from './nutrition';
import { Category } from './category';
import { Ingredient } from './ingredient';
import { Recipe } from './recipe';

export interface CreateRecipe {
  title: string;
  description: string;
  category: Category;
  products: Ingredient[];
  recipes: Recipe[];
  nutrition: Nutrition;
}
