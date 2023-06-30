import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'tabs' con el guardia de autenticación
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then(m => m.SesionPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'reportes' con el guardia de autenticación
  },
  {
    path: 'asignados',
    loadChildren: () => import('./asignados/asignados.module').then(m => m.AsignadosPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'asignados' con el guardia de autenticación
  },
  {
    path: 'reportar',
    loadChildren: () => import('./reportar/reportar.module').then(m => m.ReportarPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'reportar' con el guardia de autenticación
  },
  {
    path: 'insumos',
    loadChildren: () => import('./insumos/insumos.module').then(m => m.InsumosPageModule),
    canActivate: [AuthGuard] // Protege la ruta 'insumos' con el guardia de autenticación
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}




