import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AListaComponent } from './ALista.component';

const routes: Routes = [
  {
    path: '',
    component: AListaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AListaPageRoutingModule {}