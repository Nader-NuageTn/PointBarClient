import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarsComponent } from './calendar.component';
import { AdminGuardService } from '../shared/auth/admin-guard.service';

const routes: Routes = [
  {
    
    path: '',
     component: CalendarsComponent,
     canActivate: [AdminGuardService]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule { }

export const routedComponents = [CalendarsComponent];