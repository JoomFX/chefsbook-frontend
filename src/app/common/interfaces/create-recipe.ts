import { Ingredient } from './ingredient';
import { Recipe } from './recipe';

export interface CreateRecipe {
  title: string;
  description: string;
  category: string;
  products: Ingredient[];
  recipes: Recipe[];
}
