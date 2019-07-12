import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../app/common/interfaces/recipe';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
  @Input() public recipe: Recipe;
  @Input() public showDescription: boolean;

  constructor() { }

  ngOnInit() {
  }

}
