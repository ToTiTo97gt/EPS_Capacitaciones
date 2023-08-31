import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiplomasPage } from './diplomas.page';

const routes: Routes = [
  {
    path: '',
    component: DiplomasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiplomasPageRoutingModule {}
