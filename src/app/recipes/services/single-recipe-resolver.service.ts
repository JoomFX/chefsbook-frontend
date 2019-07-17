import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from '../../common/interfaces/recipe';
import { RecipesDataService } from './recipes-data.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleRecipeResolverService implements Resolve<Recipe | {recipe: Recipe}> {

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const recipeId = route.paramMap.get('id');
    return this.recipesDataService.getSingleRecipe(recipeId)
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({recipe: null});
        }
      ));
  }
}
