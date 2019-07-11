import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from './../../common/interfaces/product';
import { Recipe } from './../../common/interfaces/recipe';

@Component({
  selector: 'app-item-nutrition',
  templateUrl: './item-nutrition.component.html',
  styleUrls: ['./item-nutrition.component.css']
})
export class ItemNutritionComponent implements OnInit, OnChanges {
  @Input() public item: Product & Recipe;
  @Input() public amount: number;
  @Input() public measure: string;

  public itemNutrition = [];
  public coefficient = 0;

  constructor() { }

  ngOnInit() {
    this.itemNutrition = Object.entries(this.item.nutrition);
  }

  ngOnChanges() {
    if (this.measure) {
      const gramsPerMeasure = this.item.measures.find(element => element.measure === this.measure).gramsPerMeasure;
      const itemQuantityInGrams = this.amount * gramsPerMeasure;

      this.coefficient = itemQuantityInGrams / 100;
    }
  }
}
