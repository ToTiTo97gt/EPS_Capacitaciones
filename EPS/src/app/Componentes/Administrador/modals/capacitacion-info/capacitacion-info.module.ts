import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapacitacionInfoPageRoutingModule } from './capacitacion-info-routing.module';

import { CapacitacionInfoPage } from './capacitacion-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapacitacionInfoPageRoutingModule
  ],
  declarations: [CapacitacionInfoPage]
})
export class CapacitacionInfoPageModule {}
