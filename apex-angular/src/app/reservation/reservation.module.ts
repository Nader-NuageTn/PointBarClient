import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ReservationRoutingModule } from "./reservation-routing.module";


import { ReservationManagementComponent } from './reservation-management/reservation-management.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';
import { ReservationComponent } from './reservation.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ReservationRoutingModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        ReservationManagementComponent,
        ConfirmReservationComponent,
        ReservationComponent]
})
export class ReservationModule { }
