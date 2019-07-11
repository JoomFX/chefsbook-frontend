import { Component, OnInit } from '@angular/core';
import { Recipe } from '../common/interfaces/recipe';
import { RecipesDataService } from './services/recipes-data.service';
import { Recipes } from '../common/interfaces/recipes';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[] = [];

  constructor(
    private readonly recipeDataService: RecipesDataService,
  ) { }

  ngOnInit() {
    this.recipeDataService.getRecipes().subscribe(
      (recipes: Recipes) => this.recipes = recipes.recipes
    );
    console.log(this.recipes);
  }

  public showRecipes(): void {
    console.log(this.recipes);
  }

}
