import { UserLogin } from './../../common/interfaces/user-login';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../core/services/auth.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { Router } from '@angular/router';
import { UserRegister } from './../../common/interfaces/user-register';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public onRegister(): void {
    const newUser: UserRegister = this.registerForm.value;
    const loginUser: UserLogin = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.register(newUser).subscribe(
      () => {
        this.notificator.success('Your registration was successful!');
        this.authService.login(loginUser).subscribe(
          (data) => {
            this.notificator.success(`Hello, ${data.user.firstName}!`);
            this.router.navigate(['/recipes']);
          },
          () => {
            this.notificator.error('Login failed!');
          }
        );
        this.router.navigate(['/recipes']);
      },
      () => {
        this.notificator.error('Registration failed!');
      }
    );
  }
}
