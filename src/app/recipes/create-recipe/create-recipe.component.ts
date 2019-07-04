import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { RecipesDataService } from '../services/recipes-data.service';
import { Product } from 'src/app/common/interfaces/product';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  public createRecipeForm: FormGroup;
  public measuresForm: FormGroup;

  public recipeContents: Product[] = [];

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
  ) { }

  ngOnInit() {
    this.createRecipeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.measuresForm = this.formBuilder.group({
      measure: [''],
    });
  }

  public addedProduct(product: Product): void {
    console.log(product);
    this.recipeContents.push(product);
  }

  public removeProduct(productCode: number): void {
    const productIndex = this.recipeContents.findIndex((product) => product.code === productCode);
    this.recipeContents.splice(productIndex, 1);
  }

  public createRecipe(): void {
    const recipe = 'New Recipe';

    this.recipesDataService.createRecipe(recipe).subscribe(
      (recipe) => {
        this.router.navigate(['/recipes']);
        this.notificator.success('Recipe successfully created!');
      },
      (error) => {
        this.notificator.error('Recipe creation unsuccessful!');
      }
    );
  }

}
