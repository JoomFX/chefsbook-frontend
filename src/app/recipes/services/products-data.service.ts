import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './../../common/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getProducts(page = 1, search: string): Observable<Products> {
    // CHECK THE 'search' PARAMETHER IN THE URL
    return this.http.get<Products>(`http://localhost:3000/api/products?page=${page}&search=${search}`);
  }

}
