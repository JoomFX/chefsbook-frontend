import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipes } from '../../../app/common/interfaces/recipes';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipesDataService } from './recipes-data.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';

@Injectable({
  providedIn: 'root'
})
export class FilteredRecipesResolverService implements Resolve<Recipes | {recipes: Recipes}> {

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.recipesDataService.getRecipes(1, '', '', 'yes')
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({recipes: null});
        }
      ));
  }
}
