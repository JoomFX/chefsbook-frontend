import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './../../common/interfaces/products';
import { FoodGroup } from './../../common/interfaces/food-groups';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getProducts(page = 1, search = '', foodGroup = 0): Observable<Products> {
    if (foodGroup === 0) {
      return this.http.get<Products>(
        `http://localhost:3000/api/products?page=${page}&search=${search}`
      );
    } else {
      return this.http.get<Products>(
        `http://localhost:3000/api/products?page=${page}&search=${search}&foodGroup=${foodGroup}`
      );
    }
  }

  public getFoodGroups(): Observable<FoodGroup[]> {
    return this.http.get<FoodGroup[]>(
      `http://localhost:3000/api/products/foodgroups`
    );
  }

}
