import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../../app/core/services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  public searchForm: FormGroup;
  public clearSearchDisabled = true;

  constructor(
    private readonly searchService: SearchService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  public onSearch(): void {
    this.clearSearchDisabled = false;
    this.searchService.emitSearch(this.searchForm.value.search);
  }

  public clearSearch(): void {
    this.searchForm.reset();
    this.clearSearchDisabled = true;
    this.searchService.emitSearch('clearTheSearch');
  }

}
