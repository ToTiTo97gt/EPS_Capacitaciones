import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminInfoPage } from './admin-info.page';

const routes: Routes = [
  {
    path: '',
    component: AdminInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminInfoPageRoutingModule {}
