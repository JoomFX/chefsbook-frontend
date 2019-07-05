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

    this.productDataService.getProducts().subscribe(
      (products: Products) => this.products = products.products
    );
  }

  public open(modalWindow): void {
    this.modalService.open(modalWindow, { size: 'lg' });
  }

  public changeFoodGroupSelect(event): void{
    this.filterForm.controls.foodGroup.setValue(event.target.value, { onlySelf: true });
  }

  public onSubmitFilter(): void {
    const search = this.filterForm.value.search;
    const foodGroup = this.filterForm.value.foodGroup;

    this.productDataService.getProducts(1, search, foodGroup).subscribe(
      (products: Products) => this.products = products.products
    );
  }

  public onClearFilter(): void {
    this.filterForm.controls.search.reset();
    this.filterForm.controls.foodGroup.setValue('', { onlySelf: true });

    this.productDataService.getProducts().subscribe(
      (products: Products) => this.products = products.products
    );
  }

  public addProductToRecipe(product) {
    this.addedProduct.emit(product);
  }

}
