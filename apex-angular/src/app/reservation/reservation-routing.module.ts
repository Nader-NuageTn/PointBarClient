import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { ReservationManagementComponent } from "./reservation-management/reservation-management.component";
import { ReservationSettingComponent } from "./reservation-setting/reservation-setting.component";
import { AdminGuardService } from '../shared/auth/admin-guard.service';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'ReservationManagement',
                component: ReservationManagementComponent,
                data: {
                  title: 'Gestion des Reservations'
                },
                canActivate: [AdminGuardService]
            }, {
                path: 'ReservationSetteing',
                component: ReservationSettingComponent,
                data: {
                    title: 'Evenements'
                },
                canActivate: [AdminGuardService]

            }

        ]
        
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule{ }
