import { Category } from './../../common/interfaces/category';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipesDataService } from './recipes-data.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolverService implements Resolve<Category[] | {categories: Category[]}> {

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.recipesDataService.getRecipeCategories()
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({categories: null});
        }
      ));
  }
}
