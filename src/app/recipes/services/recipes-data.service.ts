import { CreateRecipe } from './../../common/interfaces/create-recipe';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './../../common/interfaces/category';
import { Recipe } from '../../common/interfaces/recipe';
import { Recipes } from '../../common/interfaces/recipes';

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

  public getRecipes(page = 1, search = '', category = '', filtered = ''): Observable<Recipes> {
    if (filtered) {
      return this.http.get<Recipes>(
        `http://localhost:3000/api/recipes?page=${page}&search=${search}&category=${category}&filtered=yes`
      );
    } else {
      return this.http.get<Recipes>(
        `http://localhost:3000/api/recipes?page=${page}&search=${search}&category=${category}`
      );
    }
  }

  public getSingleRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`http://localhost:3000/api/recipes/${recipeId}`);
  }

  public createRecipe(recipe: CreateRecipe): Observable<Recipe> {
    return this.http.post<Recipe>(`http://localhost:3000/api/recipes`, recipe);
  }

  public updateRecipe(recipe): Observable<any> | void {

  }

  public deleteRecipe(recipeId: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`http://localhost:3000/api/recipes/${recipeId}`);
  }
}
