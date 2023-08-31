import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiplomasPageRoutingModule } from './diplomas-routing.module';

import { DiplomasPage } from './diplomas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiplomasPageRoutingModule
  ],
  declarations: [DiplomasPage]
})
export class DiplomasPageModule {}
