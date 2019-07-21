import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { RecipesResolverService } from '../recipes/services/recipes-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    // resolve: {
    //   recipes: RecipesResolverService,
    //   categories: CategoriesResolverService,
    // },
  },
  {
    path: ':id',
    component: CategoryDetailsComponent,
    resolve: {recipes: RecipesResolverService},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
