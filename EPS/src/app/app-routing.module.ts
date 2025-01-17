import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./Componentes/Administrador/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./Componentes/Inicio/ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./Componentes/Inicio/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'tabsu',
    loadChildren: () => import('./Componentes/Usuarios/tabsu/tabsu.module').then( m => m.TabsuPageModule)
  },
  {
    path: 'admin-info',
    loadChildren: () => import('./Componentes/Administrador/modals/admin-info/admin-info.module').then( m => m.AdminInfoPageModule)
  },
  {
    path: 'crear-info',
    loadChildren: () => import('./Componentes/Administrador/modals/crear-info/crear-info.module').then( m => m.CrearInfoPageModule)
  },
  {
    path: 'capacitacion-info',
    loadChildren: () => import('./Componentes/Administrador/modals/capacitacion-info/capacitacion-info.module').then( m => m.CapacitacionInfoPageModule)
  },
  {
    path: 'datos-usuario',
    loadChildren: () => import('./Componentes/Usuarios/modals/datos-usuario/datos-usuario.module').then( m => m.DatosUsuarioPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./Componentes/Usuarios/modals/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'inscripcion-info',
    loadChildren: () => import('./Componentes/Administrador/modals/inscripcion-info/inscripcion-info.module').then( m => m.InscripcionInfoPageModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./Componentes/Administrador/modals/user-info/user-info.module').then( m => m.UserInfoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
