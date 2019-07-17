import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../app/common/interfaces/recipe';
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
    private readonly recipesDataService: RecipesDataService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const recipeId = this.activatedRoute.snapshot.paramMap.get('id');

    this.recipesDataService.getSingleRecipe(recipeId).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
        console.log(this.recipe.products);
        console.log(this.recipe.subrecipes);
      }
    );
    
  }

}
