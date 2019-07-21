import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../common/interfaces/recipe';
import { RecipesDataService } from './services/recipes-data.service';
import { Recipes } from '../common/interfaces/recipes';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchService } from '../core/services/search.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  public searchSubscription: Subscription;
  public recipes: Recipe[];

  // Recipes Pagination
  public page = 1;
  public pageSize = 10;
  public collectionSize: number;
  public viewing = 5;
  public through = 5;

  // Search & Filtering
  public search = '';
  public category = '';

  constructor(
    private readonly recipesDataService: RecipesDataService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.recipes = data.recipes.recipes;
      this.collectionSize = data.recipes.count;
    });

    this.activatedRoute.queryParamMap.subscribe(
      (params: Params) => {
        if (params.params.page) {
          this.page = params.params.page;
        }
      }
    );

    this.searchSubscription = this.searchService.search$.subscribe(
      (search) => {
        if (search === 'clearTheSearch') {
          this.search = '';
          this.category = '';
        } else {
          this.search = search.search;
          this.category = search.foodGroup;
        }

        this.page = 1;

        this.getRecipes('callback');
      }
    );

    this.calculateViewing();
  }

  ngOnDestroy() {
    this.searchService.emitSearch('clearTheSearch');
    this.searchSubscription.unsubscribe();
  }

  public getRecipes(callback = null): void {
    this.recipesDataService.getRecipes(this.page, this.search, this.category).subscribe(
      (recipes: Recipes) => {
        this.recipes = recipes.recipes;
        this.collectionSize = recipes.count;

        if (callback !== null) {
          this.calculateViewing();
        }
      }
    );
  }

  public onPaginationChange(page: number): void {
    this.page = page;

    this.getRecipes();
    this.calculateViewing();
    this.changeURLonPagination();
  }

  public calculateViewing(): void {
    this.through = Math.min((this.page * this.pageSize), this.collectionSize);
    this.viewing = Math.min(this.pageSize, this.through - ((this.page * this.pageSize) - (this.pageSize - 1))) + 1;
  }

  public changeURLonPagination(): void {
    const page = this.page;
    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: {page}})
      .toString();

    this.location.go(url);

    window.scrollTo(0, 0);
  }

}
