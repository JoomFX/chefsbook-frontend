import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FoodGroup } from '../../../app/common/interfaces/food-groups';
import { ProductsDataService } from './products-data.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodgroupsResolverService implements Resolve<FoodGroup[] | {foodGroups: FoodGroup[]}> {

  constructor(
    private readonly productsDataService: ProductsDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.productsDataService.getFoodGroups()
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({foodGroups: null});
        }
      ));
  }
}
