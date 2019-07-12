import { RecipesDataService } from './../services/recipes-data.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from '../../../app/common/interfaces/products';
import { Product } from '../../../app/common/interfaces/product';
import { FoodGroup } from './../../common/interfaces/food-groups';
import { Category } from './../../common/interfaces/category';
import { Recipes } from './../../common/interfaces/recipes';
import { Recipe } from '../../../app/common/interfaces/recipe';

@Component({
  selector: 'app-add-contents',
  templateUrl: './add-contents.component.html',
  styleUrls: ['./add-contents.component.css']
})
export class AddContentsComponent implements OnInit {
  public products: Product[] = [];
  public foodGroups: FoodGroup[] = [];
  public recipes: Recipe[] = [];
  public categories: Category[] = [];

  // Products Pagination
  public productsPage = 1;
  public productsPageSize = 10;
  public productsCollectionSize: number;
  public productsViewing = 5;
  public productsThrough = 5;

  // Recipes Pagination
  public recipesPage = 1;
  public recipesPageSize = 10;
  public recipesCollectionSize: number;
  public recipesViewing = 5;
  public recipesThrough = 5;

  public searchProduct: string;
  public foodGroup: number;

  public searchRecipe: string;
  public category: string;

  @Input() public addedProductsModal: Product[];
  @Input() public addedRecipesModal: Recipes[];
  @Output() public addProduct = new EventEmitter<Product>();
  @Output() public addRecipe = new EventEmitter<Recipe>();

  constructor(
    private readonly productDataService: ProductsDataService,
    private readonly recipesDataService: RecipesDataService,
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getFoodGroups();
    this.getRecipes();
    this.getCategories();
  }

  public open(modalWindow): void {
    const modal = this.modalService.open(modalWindow, { size: 'lg' });

    // Modal Close Event
    modal.result.then(
      () => this.clearFilterInModals(),
      () => this.clearFilterInModals(),
    );
  }

  public getProducts(): void {
    this.productDataService.getProducts(this.productsPage, this.searchProduct, this.foodGroup).subscribe(
      (products: Products) => {
        this.products = products.products;
        this.productsCollectionSize = products.count;

        this.productsThrough = Math.min((this.productsPage * this.productsPageSize), this.productsCollectionSize);
        this.productsViewing = Math.min(this.productsPageSize, this.productsThrough - ((this.productsPage * this.productsPageSize) - (this.productsPageSize - 1))) + 1;
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

  public getRecipes(): void {
    this.recipesDataService.getRecipes(this.recipesPage, this.searchRecipe, this.category).subscribe(
      (recipes: Recipes) => {
        this.recipes = recipes.recipes;
        this.recipesCollectionSize = recipes.count;

        this.recipesThrough = Math.min((this.recipesPage * this.recipesPageSize), this.recipesCollectionSize);
        this.recipesViewing = Math.min(this.recipesPageSize, this.recipesThrough - ((this.recipesPage * this.recipesPageSize) - (this.recipesPageSize - 1))) + 1;
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

  public onSubmitFilterProduct(event): void {
    this.productsPage = 1;
    this.searchProduct = event.search;
    this.foodGroup = event.foodGroup;

    this.getProducts();
  }

  public onSubmitFilterRecipe(event): void {
    this.recipesPage = 1;
    this.searchRecipe = event.search;
    this.category = event.foodGroup;

    this.getRecipes();
  }

  public clearFilterInModals(): void {
    this.productsPage = 1;
    this.recipesPage = 1;
    this.searchProduct = '';
    this.searchRecipe = '';
    this.foodGroup = 0;
    this.category = '';

    this.getProducts();
    this.getRecipes();
  }

  public onProductsPaginationChange(page: number): void {
    this.productsPage = page;
    this.getProducts();
  }

  public onRecipesPaginationChange(page: number): void {
    this.recipesPage = page;
    this.getProducts();
  }

  public addProductToRecipe(product: Product) {
    this.addProduct.emit(product);
  }

  public addRecipeToRecipe(recipe: Recipe) {
    this.addRecipe.emit(recipe);
  }

}
