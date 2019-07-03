import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesDataService {

  constructor(
    private readonly http: HttpClient,
  ) { }

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
