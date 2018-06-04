import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PbusersComponent } from './pbusers.component';
import { AdminGuardService } from '../shared/auth/admin-guard.service';

const routes: Routes = [
  {
    path: '',
     component: PbusersComponent,
     canActivate: [AdminGuardService]
    
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PbusersRoutingModule { }

export const routedComponents = [PbusersComponent];