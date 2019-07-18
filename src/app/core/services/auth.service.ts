import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegister } from './../../common/interfaces/user-register';
import { UserLogin } from '../../../app/common/interfaces/user-login';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject$ = new BehaviorSubject<string>(
    this.loggedUser()
  );

  private userIdSubject$ = new BehaviorSubject<string>(
    this.loggedUserId()
  );

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) { }

  public loggedUser(): string | null {
    return this.storage.get('username');
  }

  public loggedUserId(): string | null {
    return this.storage.get('userId');
  }

  public get user$(): Observable<string | null> {
    return this.userSubject$.asObservable();
  }

  public get userId$(): Observable<string | null> {
    return this.userIdSubject$.asObservable();
  }

  public register(user: UserRegister): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/users', user);
  }

  public login(user: UserLogin): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/session', user)
      .pipe(
        tap(res => {
          this.userSubject$.next(res.user.username);
          this.storage.set('token', res.token);
          this.storage.set('username', res.user.username);
          this.storage.set('userId', res.user.id);
        })
      );
  }

  public logout(): Observable<any> {
    return this.http.delete('http://localhost:3000/api/auth/session', {responseType: 'text'})
      .pipe(
        tap(res => {
          this.userSubject$.next(null);
          this.storage.remove('token');
          this.storage.remove('username');
        })
      );
  }
}
