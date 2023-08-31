import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
  }
  // {
  //   path: 'tabs',
  //   redirectTo: 'menu/Jornadas'
  // },
  // {
  //   path: 'menu/:id',
  //   loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
