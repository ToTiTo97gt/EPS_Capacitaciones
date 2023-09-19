import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AListaComponent } from './ALista.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AListaPageRoutingModule } from './ALista-routing.module';
import { AdminInfoPage } from '../modals/admin-info/admin-info.page';
import { AdminInfoPageModule } from '../modals/admin-info/admin-info.module';

@NgModule({
  
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AListaPageRoutingModule,
    AdminInfoPageModule
  ],
  declarations: [AListaComponent]
})
export class AListaPageModule {}
