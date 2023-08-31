import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiplomadosPage } from './diplomados.page';

const routes: Routes = [
  {
    path: '',
    component: DiplomadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiplomadosPageRoutingModule {}
