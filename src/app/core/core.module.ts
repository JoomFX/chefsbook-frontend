import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { NotificatorService } from './services/notificator.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    StorageService,
    AuthService,
    NotificatorService,
  ],
})
export class CoreModule { }
