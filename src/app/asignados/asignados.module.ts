import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignadosPageRoutingModule } from './asignados-routing.module';

import { AsignadosPage } from './asignados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignadosPageRoutingModule
  ],
  declarations: [AsignadosPage]
})
export class AsignadosPageModule {}
