import { Component, OnInit, Input } from '@angular/core';
import { Nutrition } from '../../../app/common/interfaces/nutrition';

@Component({
  selector: 'app-total-nutrition',
  templateUrl: './total-nutrition.component.html',
  styleUrls: ['./total-nutrition.component.css']
})
export class TotalNutritionComponent implements OnInit {
  @Input() public usedFor: string;
  @Input() public nutrition: Nutrition;

  constructor() { }

  ngOnInit() {
  }

}
