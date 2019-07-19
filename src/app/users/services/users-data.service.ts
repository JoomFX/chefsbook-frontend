import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../app/common/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getSingleUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/users/${userId}`);
  }
}
