import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from './../../common/interfaces/product';
import { Recipe } from './../../common/interfaces/recipe';
import { Nutrition } from '../../../app/common/interfaces/nutrition';

@Component({
  selector: 'app-item-nutrition',
  templateUrl: './item-nutrition.component.html',
  styleUrls: ['./item-nutrition.component.css']
})
export class ItemNutritionComponent implements OnInit, OnChanges {
  @Input() public item: Product & Recipe & Nutrition;
  @Input() public amount: number;
  @Input() public measure: string;
  @Input() public usedFor: string;

  public itemNutrition = [];
  public coefficient = 0;

  constructor() { }

  ngOnInit() {
    if (this.usedFor === 'total') {
      this.itemNutrition = Object.entries(this.item);
    } else {
      this.itemNutrition = Object.entries(this.item.nutrition);
    }
  }

  ngOnChanges() {
    if (this.usedFor === 'products' && this.measure) {
      const gramsPerMeasure = this.item.measures.find(element => element.measure === this.measure).gramsPerMeasure;
      const itemQuantityInGrams = this.amount * gramsPerMeasure;

      this.coefficient = itemQuantityInGrams / 100;
    } else if (this.usedFor === 'recipes' || this.usedFor === 'total') {
      this.coefficient = this.amount;
    }
  }
}
