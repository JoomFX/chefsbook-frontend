import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './../../common/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class RecipesDataService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getRecipeCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `http://localhost:3000/api/recipes/categories`
    );
  }

  public getRecipes(page = 1, search: string): Observable<any> | void {

  }

  public getSingleRecipe(recipeid: string): Observable<any> | void {

  }

  public createRecipe(recipe): Observable<any> {
    return null;
  }

  public updateRecipe(recipe): Observable<any> | void {

  }

  public deleteRecipe(recipeid: string): Observable<any> | void {

  }
}
