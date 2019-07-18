import { Products } from './../../common/interfaces/products';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsDataService } from './products-data.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Products | {products: Products}> {

  constructor(
    private readonly productsDataService: ProductsDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.productsDataService.getProducts()
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({products: null});
        }
      ));
  }
}
