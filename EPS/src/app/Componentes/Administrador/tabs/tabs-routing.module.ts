import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '', //aqui antes estaba tabs escrito, pero lo cambie para que funcionara la navegacion
    component: TabsPage,
    children: [
      {
        path: 'Crear',
        loadChildren: () => import('../crear/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'Inscripciones',
        loadChildren: () => import('../inscripciones/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'Administracion',
        loadChildren: () => import('../ALista/ALista.module').then(m => m.AListaPageModule)
      },
      {
        path: 'Asistencias',
        loadChildren: () => import('../conferencias/conferencias.module').then(m => m.ConferenciasPageModule)
      },
      {
        path: 'ayudas',
        loadChildren: () => import('../../Administrador/ayudas/ayudas.module').then(m => m.AyudasPageModule)
      }/* ,
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      } */
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
