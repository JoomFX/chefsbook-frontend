import { RecipesDataService } from './../services/recipes-data.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../app/common/interfaces/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipesDataService: RecipesDataService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => this.recipe = data.recipe);
  }

  public open(modalWindow): void {
    this.modalService.open(modalWindow, { size: 'lg' });
  }

  public deleteRecipe(recipeId: string): void {
    this.recipesDataService.deleteRecipe(recipeId).subscribe(
      (recipe: Recipe) => {
        this.router.navigate(['/recipes']);
        this.notificator.success('Recipe deteled successfully!');
      },
      (error) => {
        this.notificator.error('Recipe delete failed!');
      }
    );
  }

}
