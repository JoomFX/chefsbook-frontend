import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesResolverService } from '../recipes/services/categories-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      categories: CategoriesResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
