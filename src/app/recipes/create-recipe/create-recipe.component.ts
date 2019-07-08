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

  public recipeProducts: Product[] = [];
  public recipeRecipes: any = [];
  public recipeCategories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
  ];

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
      category: ['', Validators.required],
    });

    this.measuresForm = this.formBuilder.group({
      measure: [''],
    });
  }

  public addedProduct(product: Product): void {
    console.log(product);
    this.recipeProducts.push(product);
  }

  public removeProduct(productCode: number): void {
    const productIndex = this.recipeProducts.findIndex((product) => product.code === productCode);
    this.recipeProducts.splice(productIndex, 1);
  }

  public onChangeCategorySelect(event): void{
    this.createRecipeForm.controls.category.setValue(event.target.value, { onlySelf: true });
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
