import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-buttons',
  templateUrl: './top-buttons.component.html',
  styleUrls: ['./top-buttons.component.css']
})
export class TopButtonsComponent implements OnInit {
  @Input() public showSearch: boolean;

  constructor() { }

  ngOnInit() {
  }

}
