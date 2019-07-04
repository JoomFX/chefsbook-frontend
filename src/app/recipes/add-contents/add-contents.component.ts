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
    });

    this.productDataService.getProducts().subscribe(
      (products: Products) => this.products = products.products
    );
  }

  public open(modalWindow): void {
    this.modalService.open(modalWindow, { size: 'lg' });
  }

  public addProductToRecipe(product) {
    this.addedProduct.emit(product);
  }

}
