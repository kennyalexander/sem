import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('../reportes/reportes.module').then(m => m.ReportesPageModule)
      },
      {
        path: 'asignados',
        loadChildren: () => import('../asignados/asignados.module').then( m => m.AsignadosPageModule)
      },
      {
        path: 'reportar',
        loadChildren: () => import('../reportar/reportar.module').then( m => m.ReportarPageModule)
      },
      {
        path: 'insumos',
        loadChildren: () => import('../insumos/insumos.module').then( m => m.InsumosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/reportes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/reportes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
