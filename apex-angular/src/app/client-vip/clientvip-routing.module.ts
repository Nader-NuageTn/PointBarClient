import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientVipComponent } from './client-vip.component';
import { AdminGuardService } from '../shared/auth/admin-guard.service';

const routes: Routes = [
  {
    path: '',
     component: ClientVipComponent,
     canActivate: [AdminGuardService]
    
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientvipRoutingModule { }

export const routedComponents = [ClientVipComponent];