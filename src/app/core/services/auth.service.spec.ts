import { UserLogin } from './../../common/interfaces/user-login';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  const http = jasmine.createSpyObj('HttpClient', ['post', 'delete']);
  const storage = jasmine.createSpyObj('StorageService', ['get', 'set', 'remove']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: HttpClient,
        useValue: http,
      },
      {
        provide: StorageService,
        useValue: storage,
      }
    ],
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('login should log the use in', () => {
    const service: AuthService = TestBed.get(AuthService);

    const user: UserLogin = {
      email: 'ivo@ivo.com',
      password: 'password',
    };

    http.post.and.returnValue(of({
      token: 'token',
      user: { username: 'ivo' },
    }));

    service.login(user).subscribe(
      (res) => expect(res.user.username).toBe('ivo')
    );
  });

  it('login should call http.post', () => {
    const service: AuthService = TestBed.get(AuthService);

    const user: UserLogin = {
      email: 'ivo@ivo.com',
      password: 'password',
    };

    http.post.calls.reset();

    service.login(user).subscribe(
      () => expect(http.post).toHaveBeenCalledTimes(1)
    );
  });

  it('login should update the subject', () => {
    const service: AuthService = TestBed.get(AuthService);

    const user: UserLogin = {
      email: 'ivo@ivo.com',
      password: 'password',
    };

    service.login(user).subscribe(
      (res) => {
        service.user$.subscribe(
          (obj) => expect(obj.username).toBe('ivo')
        );
      }
    );
  });

  it('logout should change the Subject to null', () => {
    const service: AuthService = TestBed.get(AuthService);

    http.delete.and.returnValue(of({
      username: undefined,
      id: undefined,
    }));

    service.logout();

    service.user$.subscribe(
      (obj) => expect(obj.username).toBe(undefined)
    );
  });

  it('logout should call storage.remove twice', () => {
    const service: AuthService = TestBed.get(AuthService);

    http.delete.and.returnValue(of({
      username: undefined,
      id: undefined,
    }));

    storage.remove.calls.reset();

    service.logout().subscribe(
      () => {
        expect(storage.remove).toHaveBeenCalledTimes(3);
      }
    );
  });
});
