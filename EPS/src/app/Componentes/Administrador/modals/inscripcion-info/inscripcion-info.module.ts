import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionInfoPageRoutingModule } from './inscripcion-info-routing.module';

import { InscripcionInfoPage } from './inscripcion-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionInfoPageRoutingModule
  ],
  declarations: [InscripcionInfoPage]
})
export class InscripcionInfoPageModule {}
