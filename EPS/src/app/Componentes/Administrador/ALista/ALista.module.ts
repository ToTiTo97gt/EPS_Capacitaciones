import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AListaComponent } from './ALista.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AListaPageRoutingModule } from './ALista-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AListaPageRoutingModule
  ],
  declarations: [AListaComponent]
})
export class AListaPageModule {}
