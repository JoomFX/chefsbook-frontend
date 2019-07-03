import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public toTop(): void {
    const top = document.querySelector('body');
    top.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

}
