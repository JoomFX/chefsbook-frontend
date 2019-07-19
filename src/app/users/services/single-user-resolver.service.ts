import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../../../app/common/interfaces/user';
import { UsersDataService } from './users-data.service';
import { NotificatorService } from '../../../app/core/services/notificator.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleUserResolverService implements Resolve<User | {user: User}> {

  constructor(
    private readonly usersDataService: UsersDataService,
    private readonly notificator: NotificatorService,
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const userId = route.paramMap.get('id');
    return this.usersDataService.getSingleUser(userId)
      .pipe(catchError(
        res => {
          this.notificator.error(res.error.error);
          return of({user: null});
        }
      ));
  }
}
