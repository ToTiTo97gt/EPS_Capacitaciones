import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsuPage } from './tabsu.page';

const routes: Routes = [
  {
    path: '', //aqui antes estaba tabs escrito, pero lo cambie para que funcionara la navegacion
    component: TabsuPage,
    children: [
      {
        path: 'conferencias',
        loadChildren: () => import('../conferencias/conferencias.module').then(m => m.ConferenciasPageModule)
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('../inscripciones/inscripciones.module').then(m => m.InscripcionesPageModule)
      },
      {
        path: 'diplomas',
        loadChildren: () => import('../diplomas/diplomas.module').then(m => m.DiplomasPageModule)
      },
      {
        path: 'ayuda',
        loadChildren: () => import('../ayuda/ayuda.module').then(m => m.AyudaPageModule)
      }/* ,
      {
        path: '',
        redirectTo: '/tabsu/conferencias',
        pathMatch: 'full'
      } */
    ]
  },
  {
    path: '',
    redirectTo: '/tabsu/conferencias',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsuPageRoutingModule {}
