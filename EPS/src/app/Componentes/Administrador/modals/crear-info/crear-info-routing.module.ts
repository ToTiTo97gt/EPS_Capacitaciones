import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearInfoPage } from './crear-info.page';

const routes: Routes = [
  {
    path: '',
    component: CrearInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearInfoPageRoutingModule {}
