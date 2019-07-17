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
    this.activatedRoute.data.subscribe(data => {
      this.recipe = data.recipe;
    });
  }

}
