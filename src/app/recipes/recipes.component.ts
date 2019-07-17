import { Component, OnInit } from '@angular/core';
import { Recipe } from '../common/interfaces/recipe';
import { RecipesDataService } from './services/recipes-data.service';
import { Recipes } from '../common/interfaces/recipes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public recipes: Recipe[];
  public productsCollectionSize: number;

  constructor(
    private readonly recipeDataService: RecipesDataService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.recipes = data.recipes.recipes;
      this.productsCollectionSize = data.recipes.count;
    });
  }

  public showRecipes(): void {
    console.log(this.recipes);
  }

}
