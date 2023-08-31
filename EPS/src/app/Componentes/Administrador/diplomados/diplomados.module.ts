import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiplomadosPageRoutingModule } from './diplomados-routing.module';

import { DiplomadosPage } from './diplomados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiplomadosPageRoutingModule
  ],
  declarations: [DiplomadosPage]
})
export class DiplomadosPageModule {}
