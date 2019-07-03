import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public loggedInSubscription: Subscription;
  public loggedInUser: string;
  public isLogged: boolean;

  constructor(
    private readonly authService: AuthService,
  ) {}

  ngOnInit() {
    this.loggedInSubscription = this.authService.user$.subscribe(
      data => {
        this.loggedInUser = data;
        this.isLogged = !!data;
      }
    );
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }

}
