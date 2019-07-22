import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../app/common/interfaces/category';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../../app/core/services/search.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  @Input() public category: Category;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService,
    private readonly router: Router,
    private readonly location: Location,
  ) { }

  ngOnInit() {
  }

  public onCategoryClick(cat: string): void {
    const search = {
      search: '',
      foodGroup: cat,
    };

    const category = cat.toLowerCase();

    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: {category}}).toString();
    this.location.go(url);

    this.searchService.emitSearch(search);

    window.scrollTo(0, 0);

    this.router.navigate(['/recipes'], {queryParams: {category}});
  }


}
