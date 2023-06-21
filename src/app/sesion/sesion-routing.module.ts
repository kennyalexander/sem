import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SesionPage } from './sesion.page';

const routes: Routes = [
  {
    path: '',
    component: SesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionPageRoutingModule {}
