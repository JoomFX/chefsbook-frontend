import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../app/common/interfaces/category';
import { Router } from '@angular/router';
import { SearchService } from '../../../app/core/services/search.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  @Input() public category: Category;

  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  public onCategoryClick(cat: string): void {
    const search = {
      search: '',
      foodGroup: cat,
    };

    const category = cat.toLowerCase();

    this.router.navigate(['/recipes'], {queryParams: {category}});

    this.searchService.emitSearch(search);

    window.scrollTo(0, 0);
  }


}
