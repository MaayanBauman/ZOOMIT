import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ZoomersComponent } from './zoomers/zoomers.component';
import { ChartComponent } from './categories/chart/chart.component';
import { CategoriesComponent } from './categories/categories.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ChartComponent,
    ZoomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
