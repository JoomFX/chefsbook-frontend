import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FoodGroup } from '../../common/interfaces/food-groups';
import { Category } from '../../common/interfaces/category';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../app/core/services/search.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  public searchSubscription: Subscription;
  public filterForm: FormGroup;
  public searchPlaceholder: string;
  public selectPlaceholder: string;

  @Input() public usedFor: string;
  @Input() public foodGroups: FoodGroup[] & Category[];
  @Output() public submitFilter = new EventEmitter();
  @Output() public clearFilter = new EventEmitter();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      search: [''],
      foodGroup: [''],
    });

    if (this.usedFor === 'products') {
      this.searchPlaceholder = 'Products';
      this.selectPlaceholder = 'FoodGroup';
    } else if (this.usedFor === 'recipes' || this.usedFor === 'list-recipes') {
      this.searchPlaceholder = 'Recipes';
      this.selectPlaceholder = 'Category';
    }

    if (this.usedFor === 'list-recipes') {
      this.searchSubscription = this.searchService.search$.subscribe(
        (search) => {
          if (search === 'clearTheSearch') {
            this.filterForm.controls.search.setValue('', { onlySelf: true });
            this.filterForm.controls.foodGroup.setValue('', { onlySelf: true });
          } else {
            this.filterForm.controls.search.setValue(search.search, { onlySelf: true });
            this.filterForm.controls.foodGroup.setValue(search.foodGroup, { onlySelf: true });
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.usedFor === 'list-recipes') {
      this.searchSubscription.unsubscribe();
    }
  }

  public onChangeFoodGroupSelect(event): void {
    this.filterForm.controls.foodGroup.setValue(event.target.value, { onlySelf: true });
  }

  public onSubmitFilter(): void {
    const search = this.filterForm.value.search;
    const foodGroup = this.filterForm.value.foodGroup;

    this.submitFilter.emit({search, foodGroup});
  }

  public onClearFilter(): void {
    const search = '';
    let foodGroup: number | string;

    if (this.usedFor === 'products') {
      foodGroup = 0;
    } else if (this.usedFor === 'recipes' || this.usedFor === 'list-recipes') {
      foodGroup = '';
    }

    this.filterForm.controls.search.setValue('');
    this.filterForm.controls.foodGroup.setValue('', { onlySelf: true });

    this.clearFilter.emit({search, foodGroup});
  }

}
