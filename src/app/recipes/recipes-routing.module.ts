import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesResolverService } from './services/recipes-resolver.service';
import { SingleRecipeResolverService } from './services/single-recipe-resolver.service';
import { ProductsResolverService } from './services/products-resolver.service';
import { FoodgroupsResolverService } from './services/foodgroups-resolver.service';
import { CategoriesResolverService } from './services/categories-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: {recipes: RecipesResolverService},
  },
  {
    path: 'create',
    component: CreateRecipeComponent,
    resolve: {
      products: ProductsResolverService,
      foodGroups: FoodgroupsResolverService,
      recipes: RecipesResolverService,
      categories: CategoriesResolverService,
    },
  },
  {
    path: ':id',
    component: RecipeDetailsComponent,
    resolve: {recipe: SingleRecipeResolverService},
  },
  {
    path: ':id/update',
    component: CreateRecipeComponent,
    pathMatch: 'full',
    resolve: {
      products: ProductsResolverService,
      foodGroups: FoodgroupsResolverService,
      recipes: RecipesResolverService,
      categories: CategoriesResolverService,
      recipe: SingleRecipeResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
