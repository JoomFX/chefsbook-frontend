import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public isLoggedInSubscription: Subscription;
  public isLoggedIn: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.isLoggedInSubscription = this.authService.user$.subscribe(
      (data) => {
        if (data !== null && data.username !== null) {
          this.isLoggedIn = true;

          this.router.navigate(['/recipes']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
  }

}
