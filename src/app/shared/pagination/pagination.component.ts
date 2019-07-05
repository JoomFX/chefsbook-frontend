import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() public collectionSize: number;
  @Input() public pageSize: number;
  @Input() public page: number;
  @Input() public viewing: number;
  @Input() public through: number;

  @Output() public newPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public loadPage(page: number): void {
    this.newPage.emit(page);
  }

}
