import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../app/core/services/search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../app/common/interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  public searchSubscription: Subscription;
  public clearSearchDisabled = true;

  public categories: Category[];

  constructor(
    private readonly modalService: NgbModal,
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      data => this.categories = data.categories
    );

    this.searchSubscription = this.searchService.search$.subscribe(
      (search) => {
        if (search === 'clearTheSearch') {
          this.clearSearchDisabled = true;
        } else {
          this.clearSearchDisabled = false;
        }
      }
    );
  }

  public open(modalWindow): void {
    const modal = this.modalService.open(modalWindow, { size: 'lg' });
  }

  public onSubmitFilterRecipe(event): void {
    if (event.search === '' && event.foodGroup === '') {
      this.clearSearch();
    } else {
      this.searchService.emitSearch(event);
    }

    this.modalService.dismissAll();
  }

  public clearSearch(): void {
    this.searchService.emitSearch('clearTheSearch');
    window.scrollTo(0, 0);
  }

}
