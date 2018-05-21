import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { ReservationManagementComponent } from "./reservation-management/reservation-management.component";
import { ConfirmReservationComponent } from "./confirm-reservation/confirm-reservation.component";


const routes: Routes = [
    {
        path: '',
        component: ReservationComponent,
        data: {
          title: 'Reservations'
        },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule{ }
