import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Nutrition } from 'src/app/common/interfaces/nutrition';
import { Measure } from 'src/app/common/interfaces/measure';

@Component({
  selector: 'app-product-nutritions',
  templateUrl: './product-nutritions.component.html',
  styleUrls: ['./product-nutritions.component.css']
})

export class ProductNutritionsComponent implements OnInit, OnChanges {
  @Input() nutritionPerGram: Nutrition;
  @Input() productMeasure: Measure[];
  @Input() meassure: string;
  @Input() quantity: number;
  productNutrition: Nutrition;
  keys: string[];
  gramsPerMeasure: number;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if (this.nutritionPerGram && this.productMeasure && this.meassure && this.quantity) {
      this.productMeasure.forEach(el => {
        if (el.measure === this.meassure) {
          this.gramsPerMeasure = el.gramsPerMeasure;
        }
      });
      this.productNutrition = Object.assign({}, this.nutritionPerGram);
      this.keys = Object.keys(this.nutritionPerGram);
      this.calculate();
    }
    console.log('changed')
  }


  calculate() {
    this.keys.map(key => {
      this.productNutrition[key] = this.nutritionPerGram[key].value * this.quantity * this.gramsPerMeasure;

    });

  }
}
