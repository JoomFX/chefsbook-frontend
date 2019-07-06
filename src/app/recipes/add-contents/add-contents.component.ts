import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from '../../../app/common/interfaces/products';
import { Product } from '../../../app/common/interfaces/product';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-contents',
  templateUrl: './add-contents.component.html',
  styleUrls: ['./add-contents.component.css']
})
export class AddContentsComponent implements OnInit {
  public filterForm: FormGroup;
  public products: Product[] = [];
  public foodGroups = [
    'Dairy and Egg Products',
    'Spices and Herbs',
    'Baby Foods',
    'Fats and Oils',
    'Poultry Products',
    'Soups, Sauces, and Gravies',
    'Sausages and Luncheon Meats',
    'Breakfast Cereals',
    'Fruits and Fruit Juices',
    'Pork Products',
    'Vegetables and Vegetable Products',
    'Nut and Seed Products',
    'Beef Products',
    'Beverages',
    'Finfish and Shellfish Products',
    'Legumes and Legume Products',
    'Lamb, Veal, and Game Products',
    'Baked Products',
    'Sweets',
    'Cereal Grains and Pasta',
    'Fast Foods',
    'Meals, Entrees, and Side Dishes',
    'Snacks',
    'American Indian/Alaska Native Foods',
    'Restaurant Foods',
  ];

  public page = 1;
  public pageSize = 10;
  public collectionSize: number;
  public viewing = 5;
  public through = 5;

  public search: string;
  public foodGroup: string;

  @Input() public addedProductsModal: Product[];
  @Output() public addedProduct = new EventEmitter<Product>();

  constructor(
    private readonly productDataService: ProductsDataService,
    private readonly modalService: NgbModal,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      search: [''],
      foodGroup: [''],
    });

    this.getProducts();
  }

  public open(modalWindow): void {
    this.modalService.open(modalWindow, { size: 'lg' });
  }

  public onChangeFoodGroupSelect(event): void{
    this.filterForm.controls.foodGroup.setValue(event.target.value, { onlySelf: true });
  }

  public getProducts(): void {
    this.productDataService.getProducts(this.page, this.search, this.foodGroup).subscribe(
      (products: Products) => {
        this.products = products.products;
        this.collectionSize = products.count;

        this.through = Math.min((this.page * this.pageSize), this.collectionSize);
        this.viewing = Math.min(this.pageSize, this.through - ((this.page * this.pageSize) - (this.pageSize - 1))) + 1;
      }
    );
  }

  public onSubmitFilter(): void {
    this.page = 1;
    this.search = this.filterForm.value.search;
    this.foodGroup = this.filterForm.value.foodGroup;

    this.getProducts();
  }

  public onClearFilter(): void {
    this.page = 1;
    this.search = '';
    this.foodGroup = '';
    this.filterForm.controls.search.reset();
    this.filterForm.controls.foodGroup.setValue('', { onlySelf: true });

    this.getProducts();
  }

  public onPaginationChange(page: number): void {
    this.page = page;
    this.getProducts();
    // this.productDataService.getProducts(page, this.search, this.foodGroup).subscribe(
    //   (products: Products) => {
    //     this.products = products.products;
    //     this.page = page;

    //     this.through = Math.min((page * this.pageSize), this.collectionSize);
    //     this.viewing = Math.min(this.pageSize, this.through - ((page * this.pageSize) - (this.pageSize - 1))) + 1;
    //   }
    // );
  }

  public addProductToRecipe(product) {
    this.addedProduct.emit(product);
  }

}
