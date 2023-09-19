import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearInfoPageRoutingModule } from './crear-info-routing.module';

import { CrearInfoPage } from './crear-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearInfoPageRoutingModule
  ],
  declarations: [CrearInfoPage]
})
export class CrearInfoPageModule {}
