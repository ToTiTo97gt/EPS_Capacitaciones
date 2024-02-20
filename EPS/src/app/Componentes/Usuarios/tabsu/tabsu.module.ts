import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { TabsuPageRoutingModule } from './tabsu-routing.module';

import { TabsuPage } from './tabsu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsuPageRoutingModule
  ],
  declarations: [TabsuPage]
})
export class TabsuPageModule {}
