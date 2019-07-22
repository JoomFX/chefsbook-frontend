import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../app/common/interfaces/category';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  @Input() public category: Category;

  constructor() { }

  ngOnInit() {
  }

}
