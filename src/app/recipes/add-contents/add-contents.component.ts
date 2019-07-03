import { Component, OnInit } from '@angular/core';
import { ProductsDataService } from '../services/products-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Products } from '../../../app/common/interfaces/products';
import { Product } from '../../../app/common/interfaces/product';

@Component({
  selector: 'app-add-contents',
  templateUrl: './add-contents.component.html',
  styleUrls: ['./add-contents.component.css']
})
export class AddContentsComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private readonly productDataService: ProductsDataService,
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.productDataService.getProducts().subscribe(
      (products: Products) => this.products = products.products
    );
  }

  public open(modalWindow): void {
    this.modalService.open(modalWindow);
  }

}
