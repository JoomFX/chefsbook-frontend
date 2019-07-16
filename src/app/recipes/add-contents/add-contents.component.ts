import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../app/common/interfaces/product';
import { FoodGroup } from './../../common/interfaces/food-groups';
import { Category } from './../../common/interfaces/category';
import { Recipe } from '../../../app/common/interfaces/recipe';

@Component({
  selector: 'app-add-contents',
  templateUrl: './add-contents.component.html',
  styleUrls: ['./add-contents.component.css']
})
export class AddContentsComponent implements OnInit, OnChanges {
  @Input() public products: Product[];
  @Input() public foodGroups: FoodGroup[];
  @Input() public recipes: Recipe[];
  @Input() public categories: Category[];
  @Input() public addedProductsModal: Product[];
  @Input() public addedRecipesModal: Recipe[];

  // Products Pagination
  public productsPage = 1;
  public productsPageSize = 10;
  @Input() public productsCollectionSize: number;
  public productsViewing = 5;
  public productsThrough = 5;

  // Recipes Pagination
  public recipesPage = 1;
  public recipesPageSize = 10;
  @Input() public recipesCollectionSize: number;
  public recipesViewing = 5;
  public recipesThrough = 5;

  // Products Search
  public searchProduct = '';
  public foodGroup = 0;

  // Recipe Search
  public searchRecipe = '';
  public category = '';

  @Output() public addProduct = new EventEmitter<Product>();
  @Output() public addRecipe = new EventEmitter<Recipe>();
  @Output() public getProducts = new EventEmitter();
  @Output() public getRecipes = new EventEmitter();

  constructor(
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.calculateProductViewing();
    this.calculateRecipeViewing();
  }

  public open(modalWindow): void {
    const modal = this.modalService.open(modalWindow, { size: 'lg' });

    // Modal Close Event
    modal.result.then(
      () => this.clearFilterInModals(),
      () => this.clearFilterInModals(),
    );
  }

  public isProductAdded(productId: number): boolean {
    const addedProductsId = this.addedProductsModal.map((product: Product) => product.code);

    return addedProductsId.includes(productId) ? true : false;
  }

  public isRecipeAdded(recipeId: string): boolean {
    const addedRecipesId = this.addedRecipesModal.map((recipe: Recipe) => recipe.id);

    return addedRecipesId.includes(recipeId) ? true : false;
  }

  public onSubmitFilterProduct(event): void {
    this.productsPage = 1;
    this.searchProduct = event.search;
    this.foodGroup = event.foodGroup;

    const obj = {
      productPage: this.productsPage,
      searchProduct: this.searchProduct,
      foodGroup: this.foodGroup,
    };

    this.getProducts.emit(obj);
  }

  public onSubmitFilterRecipe(event): void {
    this.recipesPage = 1;
    this.searchRecipe = event.search;
    this.category = event.foodGroup;

    const obj = {
      recipePage: this.recipesPage,
      searchRecipe: this.searchRecipe,
      category: this.category,
    };

    this.getRecipes.emit(obj);
  }

  public clearFilterInModals(): void {
    this.productsPage = 1;
    this.searchProduct = '';
    this.foodGroup = 0;

    this.recipesPage = 1;
    this.searchRecipe = '';
    this.category = '';

    const productObj = {
      productPage: this.productsPage,
      searchProduct: this.searchProduct,
      foodGroup: this.foodGroup,
    };

    const recipeObj = {
      recipePage: this.recipesPage,
      searchRecipe: this.searchRecipe,
      category: this.category,
    };

    this.getProducts.emit(productObj);
    this.getRecipes.emit(recipeObj);
  }

  public onProductsPaginationChange(page: number): void {
    this.productsPage = page;

    const obj = {
      productPage: this.productsPage,
      searchProduct: this.searchProduct,
      foodGroup: this.foodGroup,
    };

    this.getProducts.emit(obj);
  }

  public onRecipesPaginationChange(page: number): void {
    this.recipesPage = page;

    const obj = {
      recipePage: this.recipesPage,
      searchRecipe: this.searchRecipe,
      category: this.category,
    };

    this.getRecipes.emit(obj);
  }

  public calculateProductViewing(): void {
    this.productsThrough = Math.min((this.productsPage * this.productsPageSize), this.productsCollectionSize);
    this.productsViewing = Math.min(this.productsPageSize, this.productsThrough - ((this.productsPage * this.productsPageSize) - (this.productsPageSize - 1))) + 1;
  }

  public calculateRecipeViewing(): void {
    this.recipesThrough = Math.min((this.recipesPage * this.recipesPageSize), this.recipesCollectionSize);
    this.recipesViewing = Math.min(this.recipesPageSize, this.recipesThrough - ((this.recipesPage * this.recipesPageSize) - (this.recipesPageSize - 1))) + 1;
  }

  public addProductToRecipe(product: Product) {
    this.addProduct.emit(product);
  }

  public addRecipeToRecipe(recipe: Recipe) {
    this.addRecipe.emit(recipe);
  }

}
