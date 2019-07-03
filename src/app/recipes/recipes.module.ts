import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.module';
import { AddContentsComponent } from './add-contents/add-contents.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    CreateRecipeComponent,
    AddContentsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    RecipesRoutingModule,
  ]
})
export class RecipesModule { }
