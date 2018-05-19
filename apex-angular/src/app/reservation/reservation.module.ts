import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { ReservationRoutingModule } from "./reservation-routing.module";


import { ReservationManagementComponent } from './reservation-management/reservation-management.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ReservationRoutingModule
    ],
    declarations: [
        ReservationManagementComponent,
        ConfirmReservationComponent]
})
export class ReservationModule { }
