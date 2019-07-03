import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../../core/services/auth.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isNavbarCollapsed = true;
  public userId: string;

  @Input() public loggedInUser: string;
  @Input() public isLogged: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
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
}
