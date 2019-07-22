import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryViewComponent } from './category-view/category-view.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryViewComponent],
  imports: [
    SharedModule,
    RouterModule,
    CategoriesRoutingModule,
  ]
})
export class CategoriesModule { }
