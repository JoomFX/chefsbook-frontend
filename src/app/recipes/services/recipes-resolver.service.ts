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

    return this.recipesDataService.getRecipes(this.page)
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({recipes: null});
        }
      ));
  }
}
