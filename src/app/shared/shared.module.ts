import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './search-box/search-box.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    SearchBoxComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SearchBoxComponent,
    PaginationComponent,
  ],
})
export class SharedModule { }
