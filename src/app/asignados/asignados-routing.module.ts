import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignadosPage } from './asignados.page';

const routes: Routes = [
  {
    path: '',
    component: AsignadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignadosPageRoutingModule {}
