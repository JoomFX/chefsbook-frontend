import { Subrecipe } from './subrecipe';
import { Nutrition } from './nutrition';
import { Category } from './category';
import { Ingredient } from './ingredient';

export interface CreateUpdateRecipe {
  id?: string;
  title: string;
  description: string;
  category: Category;
  products: Ingredient[];
  recipes: Subrecipe[];
  nutrition: Nutrition;
}
