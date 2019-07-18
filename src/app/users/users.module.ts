import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UserDetailsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    UsersRoutingModule,
  ]
})
export class UsersModule {}
