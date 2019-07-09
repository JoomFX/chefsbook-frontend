import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { RecipesDataService } from '../services/recipes-data.service';
import { Product } from '../../../app/common/interfaces/product';
import { CreateRecipe } from './../../common/interfaces/create-recipe';
import { Recipe } from './../../common/interfaces/recipe';
import { Ingredient } from './../../common/interfaces/ingredient';
import { Category } from './../../common/interfaces/category';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  public createRecipeForm: FormGroup;
  public productsList: FormArray;

  public recipeProducts: Product[] = [];
  public recipeRecipes: Recipe[] = [];
  public recipeCategories: Category[] = [];

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
      products: this.formBuilder.array([]),
    });

    this.productsList = this.createRecipeForm.get('products') as FormArray;
    this.recipesDataService.getRecipeCategories().subscribe(
      (categories: Category[]) => this.recipeCategories = categories
    );
  }

  public addProduct(product: Product): void {
    this.recipeProducts.push(product);
    this.addProductFormGroup();
  }

  public removeProduct(productCode: number): void {
    const productIndex = this.recipeProducts.findIndex((product) => product.code === productCode);
    this.recipeProducts.splice(productIndex, 1);
    this.removeProductFormGroup(productIndex);
  }

  public createProductFormGroup(): FormGroup {
    return this.formBuilder.group({
      amount: ['', [Validators.required]],
      measure: ['', [Validators.required]],
    });
  }

  public addProductFormGroup(): void {
    this.productsList.push(this.createProductFormGroup());
  }

  public removeProductFormGroup(index: number): void {
    this.productsList.removeAt(index);
  }

  public getProductFormGroup(index: number): FormGroup {
    this.productsList = this.createRecipeForm.get('products') as FormArray;
    const formGroup = this.productsList.controls[index] as FormGroup;

    return formGroup;
  }

  public onChangeProductMeasureSelect(index: number, event): void{
    this.getProductFormGroup(index).controls.measure.setValue(event.target.value, { onlySelf: true });
  }

  public onChangeCategorySelect(event): void{
    this.createRecipeForm.controls.category.setValue(event.target.value, { onlySelf: true });
  }

  public createRecipe(): void {
    const ingredients: Ingredient[] = [];
    this.recipeProducts.map((product: Product, index) => {
      const ingredient: Ingredient = {
        product,
        amount: this.getProductFormGroup(index).value.amount,
        measure: this.getProductFormGroup(index).value.measure,
      };

      ingredients.push(ingredient);
    });

    const recipe: CreateRecipe = {
      title: this.createRecipeForm.value.title,
      description: this.createRecipeForm.value.description,
      category: this.createRecipeForm.value.category,
      products: ingredients,
      recipes: this.recipeRecipes,
      nutrition: null,
    };

    console.log(recipe);

    this.recipesDataService.createRecipe(recipe).subscribe(
      (recipe: Recipe) => {
        // this.router.navigate(['/recipes']);
        // this.notificator.success('Recipe successfully created!');
        console.log(recipe);
      },
      (error) => {
        this.notificator.error('Recipe creation unsuccessful!');
      }
    );
  }

}
