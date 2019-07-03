import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../core/services/auth.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { Router } from '@angular/router';
import { UserLogin } from './../../common/interfaces/user-login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onLogin(): void {
    const user: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(user).subscribe(
      (data: any) => {
        this.notificator.success(`Hello, ${data.user.firstName}!`);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.log(error);
        this.notificator.error('Login failed!');
      }
    );
  }
}
