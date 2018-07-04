import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./statistic/dashboard.component";
import { AdminGuardService } from '../shared/auth/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: DashboardComponent,
        canActivate: [AdminGuardService],
        data: {
          title: 'Dashboard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
