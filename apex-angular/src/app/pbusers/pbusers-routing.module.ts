import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PbusersComponent } from './pbusers.component';

const routes: Routes = [
  {
    path: '',
     component: PbusersComponent,
    
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PbusersRoutingModule { }

export const routedComponents = [PbusersComponent];