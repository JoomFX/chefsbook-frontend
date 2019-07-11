import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/common/interfaces/recipe';
import { RecipesDataService } from '../services/recipes-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe;

  constructor(
    private readonly recipeDataService: RecipesDataService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.recipeDataService.getSingleRecipe(params.id).subscribe(
          (recipe: Recipe) => this.recipe = recipe
        );
      }
    );
  }

}
