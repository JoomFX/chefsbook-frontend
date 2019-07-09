import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from '../../../app/common/interfaces/products';
import { Product } from '../../../app/common/interfaces/product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FoodGroup } from './../../common/interfaces/food-groups';

@Component({
  selector: 'app-add-contents',
  templateUrl: './add-contents.component.html',
  styleUrls: ['./add-contents.component.css']
})
export class AddContentsComponent implements OnInit {
  public filterForm: FormGroup;
  public products: Product[] = [];
  public foodGroups: FoodGroup[] = [];

  public page = 1;
  public pageSize = 10;
  public collectionSize: number;
  public viewing = 5;
  public through = 5;

  public search: string;
  public foodGroup: number;

  @Input() public addedProductsModal: Product[];
  @Output() public addProduct = new EventEmitter<Product>();

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
    this.getFoodGroups();
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

  public getFoodGroups(): void {
    this.productDataService.getFoodGroups().subscribe(
      (foodGroup: FoodGroup[]) => {
        this.foodGroups = foodGroup;
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
    this.foodGroup = 0;
    this.filterForm.controls.search.setValue('');
    this.filterForm.controls.foodGroup.setValue('', { onlySelf: true });

    this.getProducts();
  }

  public onPaginationChange(page: number): void {
    this.page = page;
    this.getProducts();
  }

  public addProductToRecipe(product) {
    this.addProduct.emit(product);
  }

}
