import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    CreateRecipeComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    RecipesRoutingModule,
  ]
})
export class RecipesModule { }
