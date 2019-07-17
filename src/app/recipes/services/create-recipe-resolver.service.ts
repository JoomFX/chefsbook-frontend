import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FoodGroup } from '../../../app/common/interfaces/food-groups';
import { Category } from '../../../app/common/interfaces/category';
import { Products } from '../../../app/common/interfaces/products';
import { Recipes } from '../../../app/common/interfaces/recipes';
import { RecipesDataService } from './recipes-data.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { ProductsDataService } from './products-data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateRecipeResolverService implements Resolve<any> {

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly productsDataService: ProductsDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {

    const products = this.productsDataService.getProducts()
    .pipe(catchError(
      res => {
        this.notificator.error(res.error.error);
        return of(null);
      }
    ));

    const foodGroups = this.productsDataService.getFoodGroups()
    .pipe(catchError(
      res => {
        this.notificator.error(res.error.error);
        return of(null);
      }
    ));

    const recipes = this.recipesDataService.getRecipes()
    .pipe(catchError(
      res => {
        this.notificator.error(res.error.error);
        return of(null);
      }
    ));

    const categories = this.recipesDataService.getRecipeCategories()
    .pipe(catchError(
      res => {
        this.notificator.error(res.error.error);
        return of(null);
      }
    ));

    const data = {
      products,
      foodGroups,
      recipes,
      categories,
    };

    return data;
  }
}
