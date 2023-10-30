import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './Servicios/admin.servicio';
import { UserService } from './Servicios/user.servicio';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';

import { IonicModule, IonicRouteStrategy} from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatDatepickerModule, BrowserAnimationsModule
  ,MatInputModule, MatNativeDateModule, MatFormFieldModule, IonicModule, CommonModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AdminService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
