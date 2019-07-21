import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../app/common/interfaces/recipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '../../../app/core/services/search.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
  @Input() public recipe: Recipe;
  @Input() public showDescription: boolean;
  @Input() public showEditDelete: boolean;
  @Input() public showNutrition: boolean;

  @Output() public recipeToDelete = new EventEmitter<string>();

  constructor(
    private readonly modalService: NgbModal,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit() {
  }

  public open(modalWindow): void {
    this.modalService.open(modalWindow);
  }

  public deleteRecipe(): void {
    this.recipeToDelete.emit(this.recipe.id);
  }

  public onCategoryClick(category: string): void {
    const search = {
      search: '',
      foodGroup: category,
    };

    this.searchService.emitSearch(search);

    window.scrollTo(0, 0);
  }

}
