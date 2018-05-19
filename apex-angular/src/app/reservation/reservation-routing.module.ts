import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ReservationManagementComponent } from "./reservation-management/reservation-management.component";
import { ConfirmReservationComponent } from "./confirm-reservation/confirm-reservation.component";


const routes: Routes = [
    {
        path: '',
        children: [
             {
                path: 'Management',
                component: ReservationManagementComponent,
                data: {
                    title: 'Management'
                }
            }, {
                path: 'Confirm',
                component: ConfirmReservationComponent,
                data: {
                    title: 'Confirm'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule{ }
