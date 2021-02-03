import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersCounterComponent } from './users-counter/users-counter.component';

import { MatTabsModule } from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRequestAlertComponent } from './user-request-alert/user-request-alert.component';
const config: SocketIoConfig = { url: /*config.ANGULAR_APP_SERVER_URL*/ 'http://localhost:4001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UsersCounterComponent,
    UserRequestAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
