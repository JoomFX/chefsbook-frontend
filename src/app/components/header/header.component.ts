import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../core/services/auth.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../app/core/services/search.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isNavbarCollapsed = true;

  @Input() public loggedInUser: string;
  @Input() public userId: string;
  @Input() public isLogged: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly searchService: SearchService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
  ) { }

  ngOnInit() { }

  public onLogout(): void {
    this.authService.logout().subscribe(
      () => {
        this.notificator.success('Successful logout!');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.notificator.error('Unsuccessful logout!');
      }
    );
  }

  public onLogoClick(): void {
    if (this.isLogged === false) {
      this.router.navigate(['/home']);
    } else {
      const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: {}}).toString();

      this.location.go(url);
      this.router.navigate(['/recipes']);
    }

    this.searchService.emitSearch('clearTheSearch');
  }
}
