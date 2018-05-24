import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { ReservationManagementComponent } from "./reservation-management/reservation-management.component";
import { ConfirmReservationComponent } from "./confirm-reservation/confirm-reservation.component";
import { ReservationSettingComponent } from "./reservation-setting/reservation-setting.component";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'ReservationManagement',
                component: ReservationComponent,
                data: {
                  title: 'Gestion des Reservations'
                }
            }, {
                path: 'ReservationSetteing',
                component: ReservationSettingComponent,
                data: {
                    title: 'Reservation'
                }

            }, {
                path: 'Confirm',
                component: ConfirmReservationComponent,
                data: {
                    title: 'Confirm Reservation'
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
