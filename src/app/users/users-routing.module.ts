import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SingleUserResolverService } from './services/single-user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    resolve: { user: SingleUserResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {

}
