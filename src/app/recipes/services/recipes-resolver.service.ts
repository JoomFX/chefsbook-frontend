import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipes } from '../../common/interfaces/recipes';
import { RecipesDataService } from './recipes-data.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipes | {recipes: Recipes}> {
  private page: number;
  private search: string;
  private category: string;

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    if (route.queryParams.page) {
      this.page = route.queryParams.page;
    } else {
      this.page = 1;
    }

    if (route.queryParams.search) {
      this.search = route.queryParams.search;
    } else {
      this.search = '';
    }

    if (route.queryParams.category) {
      this.category = route.queryParams.category;
    } else {
      this.category = '';
    }

    return this.recipesDataService.getRecipes(this.page, this.search, this.category)
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({recipes: null});
        }
      ));
  }
}
