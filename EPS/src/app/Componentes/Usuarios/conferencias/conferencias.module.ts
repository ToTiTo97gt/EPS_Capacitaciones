import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConferenciasPageRoutingModule } from './conferencias-routing.module';
import { CardComponent } from './card/card.component';

import { ConferenciasPage } from './conferencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConferenciasPageRoutingModule
  ],
  declarations: [ConferenciasPage, CardComponent]
})
export class ConferenciasPageModule {}
