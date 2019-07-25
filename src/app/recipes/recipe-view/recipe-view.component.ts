import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../app/common/interfaces/recipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../../app/core/services/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
  @Input() public usedFor: string;
  @Input() public recipe: Recipe;
  @Input() public showDescription: boolean;
  @Input() public showEditDelete: boolean;
  @Input() public showNutrition: boolean;

  @Output() public recipeToDelete = new EventEmitter<string>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly searchService: SearchService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
  ) { }

  ngOnInit() {
  }

  public open(modalWindow): void {
    this.modalService.open(modalWindow);
  }

  public deleteRecipe(): void {
    this.recipeToDelete.emit(this.recipe.id);
  }

  public onCategoryClick(cat: string): void {
    const search = {
      search: '',
      foodGroup: cat,
    };

    const category = cat.toLowerCase();

    if (this.usedFor === 'single-recipe') {
      this.router.navigate(['/recipes'], {queryParams: {category}});
    } else if (this.usedFor === 'list-recipes') {
      const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: {category}}).toString();
      this.location.go(url);
    }

    this.searchService.emitSearch(search);
  }

}
