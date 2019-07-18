import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { RecipesDataService } from '../services/recipes-data.service';
import { Product } from '../../../app/common/interfaces/product';
import { Recipe } from './../../common/interfaces/recipe';
import { Ingredient } from './../../common/interfaces/ingredient';
import { Category } from './../../common/interfaces/category';
import { Subrecipe } from './../../common/interfaces/subrecipe';
import { Nutrition } from '../../../app/common/interfaces/nutrition';
import { cloneDeep } from 'lodash';
import { ProductsDataService } from '../services/products-data.service';
import { FoodGroup } from '../../../app/common/interfaces/food-groups';
import { Products } from '../../../app/common/interfaces/products';
import { Recipes } from '../../../app/common/interfaces/recipes';
import { CreateUpdateRecipe } from '../../common/interfaces/create-update-recipe';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  public usedFor: string;
  public recipeToUpdate: Recipe;

  public createRecipeForm: FormGroup;
  public productsList: FormArray;
  public recipesList: FormArray;

  public products: Product[];
  public foodGroups: FoodGroup[];
  public recipes: Recipe[];
  public categories: Category[];

  public recipeProducts: Product[] = [];
  public recipeRecipes: Recipe[] = [];

  public totalRecipeNutrition: Nutrition;

  // Products Pagination
  public productsCollectionSize: number;

  // Recipes Pagination
  public recipesCollectionSize: number;

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly productDataService: ProductsDataService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.products = data.products.products;
      this.foodGroups = data.foodGroups;
      this.recipes = data.recipes.recipes;
      this.categories = data.categories;

      this.productsCollectionSize = data.products.count;
      this.recipesCollectionSize = data.recipes.count;

      if (data.recipe) {
        this.usedFor = 'update';
      } else {
        this.usedFor = 'create';
      }
    });

    this.createRecipeForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      products: this.formBuilder.array([]),
      recipes: this.formBuilder.array([]),
    });

    this.productsList = this.createRecipeForm.get('products') as FormArray;
    this.recipesList = this.createRecipeForm.get('recipes') as FormArray;

    this.totalRecipeNutrition = {
      PROCNT: { description: 'Protein', unit: 'g', value: 0 },
      FAT: { description: 'Total lipid (fat)', unit: 'g', value: 0 },
      CHOCDF: { description: 'Carbohydrate, by difference', unit: 'g', value: 0 },
      ENERC_KCAL: { description: 'Energy', unit: 'kcal', value: 0 },
      SUGAR: { description: 'Sugars, total', unit: 'g', value: 0 },
      FIBTG: { description: 'Fiber, total dietary', unit: 'g', value: 0 },
      CA: { description: 'Calcium, Ca', unit: 'mg', value: 0 },
      FE: { description: 'Iron, Fe', unit: 'mg', value: 0 },
      P: { description: 'Phosphorus, P', unit: 'mg', value: 0 },
      K: { description: 'Potassium, K', unit: 'mg', value: 0 },
      NA: { description: 'Sodium, Na', unit: 'mg', value: 0 },
      VITA_IU: { description: 'Vitamin A, IU', unit: 'IU', value: 0 },
      TOCPHA: { description: 'Vitamin E (alpha-tocopherol)', unit: 'mg', value: 0 },
      VITD: { description: 'Vitamin D', unit: 'IU', value: 0 },
      VITC: { description: 'Vitamin C, total ascorbic acid', unit: 'mg', value: 0 },
      VITB12: { description: 'Vitamin B-12', unit: 'µg', value: 0 },
      FOLAC: { description: 'Folic acid', unit: 'µg', value: 0 },
      CHOLE: { description: 'Cholesterol', unit: 'mg', value: 0 },
      FATRN: { description: 'Fatty acids, total trans', unit: 'g', value: 0 },
      FASAT: { description: 'Fatty acids, total saturated', unit: 'g', value: 0 },
      FAMS: { description: 'Fatty acids, total monounsaturated', unit: 'g', value: 0 },
      FAPU: { description: 'Fatty acids, total polyunsaturated', unit: 'g', value: 0 },
    };

    this.activatedRoute.data.subscribe(data => {
      if (data.recipe) {
        this.recipeToUpdate = data.recipe;

        this.createRecipeForm.controls.title.setValue(this.recipeToUpdate.title, { onlySelf: true });
        this.createRecipeForm.controls.description.setValue(this.recipeToUpdate.description, { onlySelf: true });
        this.createRecipeForm.controls.category.setValue(this.recipeToUpdate.category.name, { onlySelf: true });

        this.recipeProducts = this.recipeToUpdate.products.map((product) => product.product);
        this.recipeToUpdate.products.map((product: any, index) => {
          this.addProductFormGroup();
          this.getProductFormGroup(index).controls.amount.setValue(product.quantity, { onlySelf: true });
          this.getProductFormGroup(index).controls.measure.setValue(product.unit, { onlySelf: true });
        });

        this.recipeRecipes = this.recipeToUpdate.subrecipes.map((recipe) => recipe.recipe);
        this.recipeToUpdate.subrecipes.map((recipe: any, index) => {
          this.addRecipeFormGroup();
          this.getRecipeFormGroup(index).controls.amount.setValue(recipe.quantity, { onlySelf: true });
        });

        this.totalRecipeNutrition = this.recipeToUpdate.nutrition;
      }
    });
  }

  public getProducts(event): void {
    this.productDataService.getProducts(event.productPage, event.searchProduct, event.foodGroup).subscribe(
      (products: Products) => {
        this.products = products.products;
        this.productsCollectionSize = products.count;
      }
    );
  }

  public getFoodGroups(): void {
    this.productDataService.getFoodGroups().subscribe(
      (foodGroup: FoodGroup[]) => {
        this.foodGroups = foodGroup;
      }
    );
  }

  public getRecipes(event): void {
    this.recipesDataService.getRecipes(event.recipePage, event.searchRecipe, event.category, 'noSubrecipes').subscribe(
      (recipes: Recipes) => {
        this.recipes = recipes.recipes;
        this.recipesCollectionSize = recipes.count;
      }
    );
  }

  public getCategories(): void {
    this.recipesDataService.getRecipeCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }

  public addProduct(product: Product): void {
    this.recipeProducts.push(product);
    this.addProductFormGroup();
  }

  public addRecipe(recipe: Recipe): void {
    this.recipeRecipes.push(recipe);
    this.addRecipeFormGroup();
  }

  public removeProduct(productCode: number): void {
    const productIndex = this.recipeProducts.findIndex((product) => product.code === productCode);
    this.recipeProducts.splice(productIndex, 1);
    this.removeProductFormGroup(productIndex);

    this.calculateTotalNutrition();
  }

  public removeRecipe(recipeId: string): void {
    const recipeIndex = this.recipeRecipes.findIndex((recipe) => recipe.id === recipeId);
    this.recipeRecipes.splice(recipeIndex, 1);
    this.removeRecipeFormGroup(recipeIndex);

    this.calculateTotalNutrition();
  }

  public createProductFormGroup(): FormGroup {
    return this.formBuilder.group({
      amount: ['', [Validators.required]],
      measure: ['', [Validators.required]],
    });
  }

  public createRecipeFormGroup(): FormGroup {
    return this.formBuilder.group({
      amount: ['', [Validators.required]],
    });
  }

  public addProductFormGroup(): void {
    this.productsList.push(this.createProductFormGroup());
  }

  public addRecipeFormGroup(): void {
    this.recipesList.push(this.createRecipeFormGroup());
  }

  public removeProductFormGroup(index: number): void {
    this.productsList.removeAt(index);
  }

  public removeRecipeFormGroup(index: number): void {
    this.recipesList.removeAt(index);
  }

  public getProductFormGroup(index: number): FormGroup {
    this.productsList = this.createRecipeForm.get('products') as FormArray;
    const formGroup = this.productsList.controls[index] as FormGroup;

    return formGroup;
  }

  public getRecipeFormGroup(index: number): FormGroup {
    this.recipesList = this.createRecipeForm.get('recipes') as FormArray;
    const formGroup = this.recipesList.controls[index] as FormGroup;

    return formGroup;
  }

  public onChangeProductMeasureSelect(index: number, event): void {
    this.getProductFormGroup(index).controls.measure.setValue(event.target.value, { onlySelf: true });
  }

  public onChangeCategorySelect(event): void {
    this.createRecipeForm.controls.category.setValue(event.target.value, { onlySelf: true });
  }

  public calculateTotalNutrition(): void {
    // Holds the nutrition of both Products and Recipes
    const contentsNutrition: Nutrition[] = [];

    // Calculate Products Nutrition
    this.recipeProducts.map((product: Product, index: number) => {
      let quantity = 0;
      let measure = '';
      let gramsPerMeasure = 0;

      if (this.getProductFormGroup(index).controls['amount'].value) {
        quantity = this.getProductFormGroup(index).controls['amount'].value;
      }

      if (this.getProductFormGroup(index).controls['measure'].value) {
        measure = this.getProductFormGroup(index).controls['measure'].value;
        gramsPerMeasure = product.measures.find((unit: any) => unit.measure === measure).gramsPerMeasure;
      }

      const itemQuantityInGrams = quantity * gramsPerMeasure;
      const coefficient = itemQuantityInGrams / 100;

      const nutrition: Nutrition = cloneDeep(product.nutrition);

      for (const key in nutrition) {
        if (nutrition.hasOwnProperty(key) && (key !== 'id') && (key !== 'isDeleted')) {
          nutrition[key].value = Number((nutrition[key].value * coefficient).toFixed(2));
        }
      }

      contentsNutrition.push(nutrition);
    });

    // Calculate Subrecipe Nutrition
    this.recipeRecipes.map((recipe: Recipe, index: number) => {
      let quantity = 0;

      if (this.getRecipeFormGroup(index).controls['amount'].value) {
        quantity = this.getRecipeFormGroup(index).controls['amount'].value;
      }

      const nutrition: Nutrition = cloneDeep(recipe.nutrition);

      for (const key in nutrition) {
        if (nutrition.hasOwnProperty(key) && (key !== 'id') && (key !== 'isDeleted')) {
          nutrition[key].value = Number((nutrition[key].value * quantity).toFixed(2));
        }
      }

      contentsNutrition.push(nutrition);
    });

    let totalPROCNT = 0;
    let totalFAT = 0;
    let totalCHOCDF = 0;
    let totalENERC_KCAL = 0;
    let totalSUGAR = 0;
    let totalFIBTG = 0;
    let totalCA = 0;
    let totalFE = 0;
    let totalP = 0;
    let totalK = 0;
    let totalNA = 0;
    let totalVITA_IU = 0;
    let totalTOCPHA = 0;
    let totalVITD = 0;
    let totalVITC = 0;
    let totalVITB12 = 0;
    let totalFOLAC = 0;
    let totalCHOLE = 0;
    let totalFATRN = 0;
    let totalFASAT = 0;
    let totalFAMS = 0;
    let totalFAPU = 0;

    contentsNutrition.map((item: Nutrition) => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === 'PROCNT') {
            totalPROCNT += item[key].value;
          }
          if (key === 'FAT') {
            totalFAT += item[key].value;
          }
          if (key === 'CHOCDF') {
            totalCHOCDF += item[key].value;
          }
          if (key === 'ENERC_KCAL') {
            totalENERC_KCAL += item[key].value;
          }
          if (key === 'SUGAR') {
            totalSUGAR += item[key].value;
          }
          if (key === 'FIBTG') {
            totalFIBTG += item[key].value;
          }
          if (key === 'CA') {
            totalCA += item[key].value;
          }
          if (key === 'FE') {
            totalFE += item[key].value;
          }
          if (key === 'P') {
            totalP += item[key].value;
          }
          if (key === 'K') {
            totalK += item[key].value;
          }
          if (key === 'NA') {
            totalNA += item[key].value;
          }
          if (key === 'VITA_IU') {
            totalVITA_IU += item[key].value;
          }
          if (key === 'TOCPHA') {
            totalTOCPHA += item[key].value;
          }
          if (key === 'VITD') {
            totalVITD += item[key].value;
          }
          if (key === 'VITC') {
            totalVITC += item[key].value;
          }
          if (key === 'VITB12') {
            totalVITB12 += item[key].value;
          }
          if (key === 'FOLAC') {
            totalFOLAC += item[key].value;
          }
          if (key === 'CHOLE') {
            totalCHOLE += item[key].value;
          }
          if (key === 'FATRN') {
            totalFATRN += item[key].value;
          }
          if (key === 'FASAT') {
            totalFASAT += item[key].value;
          }
          if (key === 'FAMS') {
            totalFAMS += item[key].value;
          }
          if (key === 'FAPU') {
            totalFAPU += item[key].value;
          }
        }
      }
    });

    this.totalRecipeNutrition.PROCNT.value = totalPROCNT;
    this.totalRecipeNutrition.FAT.value = totalFAT;
    this.totalRecipeNutrition.CHOCDF.value = totalCHOCDF;
    this.totalRecipeNutrition.ENERC_KCAL.value = totalENERC_KCAL;
    this.totalRecipeNutrition.SUGAR.value = totalSUGAR;
    this.totalRecipeNutrition.FIBTG.value = totalFIBTG;
    this.totalRecipeNutrition.CA.value = totalCA;
    this.totalRecipeNutrition.FE.value = totalFE;
    this.totalRecipeNutrition.P.value = totalP;
    this.totalRecipeNutrition.K.value = totalK;
    this.totalRecipeNutrition.NA.value = totalNA;
    this.totalRecipeNutrition.VITA_IU.value = totalVITA_IU;
    this.totalRecipeNutrition.TOCPHA.value = totalTOCPHA;
    this.totalRecipeNutrition.VITD.value = totalVITD;
    this.totalRecipeNutrition.VITC.value = totalVITC;
    this.totalRecipeNutrition.VITB12.value = totalVITB12;
    this.totalRecipeNutrition.FOLAC.value = totalFOLAC;
    this.totalRecipeNutrition.CHOLE.value = totalCHOLE;
    this.totalRecipeNutrition.FATRN.value = totalFATRN;
    this.totalRecipeNutrition.FASAT.value = totalFASAT;
    this.totalRecipeNutrition.FAMS.value = totalFAMS;
    this.totalRecipeNutrition.FAPU.value = totalFAPU;
  }

  public createRecipe(): void {
    const recipeToCreate = this.prepareRecipe();

    this.recipesDataService.createRecipe(recipeToCreate).subscribe(
      (recipe: Recipe) => {
        this.router.navigate(['/recipes']);
        this.notificator.success('Recipe successfully created!');
      },
      (error) => {
        this.notificator.error('Recipe creation unsuccessful!');
      }
    );
  }

  public updateRecipe(): void {
    const recipeToUpdate = this.prepareRecipe();

    this.recipesDataService.updateRecipe(recipeToUpdate).subscribe(
      (recipe: Recipe) => {
        this.router.navigate(['/recipes']);
        this.notificator.success('Recipe successfully updated!');
      },
      (error) => {
        this.notificator.error('Recipe update unsuccessful!');
      }
    );
  }

  private prepareRecipe(): CreateUpdateRecipe {
    let recipeToReturn: CreateUpdateRecipe;

    const ingredients: Ingredient[] = [];
    this.recipeProducts.map((product: Product, index) => {
      const ingredient: Ingredient = {
        product,
        amount: this.getProductFormGroup(index).value.amount,
        measure: this.getProductFormGroup(index).value.measure,
      };

      ingredients.push(ingredient);
    });

    const subrecipes: Subrecipe[] = [];
    this.recipeRecipes.map((recipe: Recipe, index) => {
      const subrecipe: Subrecipe = {
        recipe,
        amount: this.getRecipeFormGroup(index).value.amount,
      };

      subrecipes.push(subrecipe);
    });

    if (this.usedFor === 'create') {
      recipeToReturn = {
        title: this.createRecipeForm.value.title,
        description: this.createRecipeForm.value.description,
        category: this.createRecipeForm.value.category,
        products: ingredients,
        recipes: subrecipes,
        nutrition: this.totalRecipeNutrition,
      };
    } else if (this.usedFor === 'update') {
      recipeToReturn = {
        id: this.recipeToUpdate.id,
        title: this.createRecipeForm.value.title,
        description: this.createRecipeForm.value.description,
        category: this.createRecipeForm.value.category,
        products: ingredients,
        recipes: subrecipes,
        nutrition: this.totalRecipeNutrition,
      };
    }

    return recipeToReturn;
  }
}
