import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionInfoPage } from './inscripcion-info.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionInfoPageRoutingModule {}
