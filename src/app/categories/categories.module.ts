import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { RecipesModule } from '../recipes/recipes.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryDetailsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    CategoriesRoutingModule,
    RecipesModule,
  ],
})
export class CategoriesModule { }
