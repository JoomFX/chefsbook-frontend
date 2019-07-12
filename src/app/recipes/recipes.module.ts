import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.module';
import { AddContentsComponent } from './add-contents/add-contents.component';
import { ItemNutritionComponent } from './item-nutrition/item-nutrition.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    CreateRecipeComponent,
    AddContentsComponent,
    ItemNutritionComponent,
    RecipeViewComponent,
    TimeAgoPipe,
  ],
  imports: [
    SharedModule,
    RouterModule,
    RecipesRoutingModule,
  ]
})
export class RecipesModule { }
