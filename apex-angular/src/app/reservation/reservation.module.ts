import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReservationRoutingModule } from "./reservation-routing.module";

import { ReservationManagementComponent } from './reservation-management/reservation-management.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';
import { ReservationComponent } from './reservation.component';
import { ReservationSettingComponent } from './reservation-setting/reservation-setting.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ReservationRoutingModule,
        Ng2SmartTableModule,
        NgbModule
    ],
    declarations: [
        ReservationManagementComponent,
        ConfirmReservationComponent,
        ReservationComponent,
        ReservationSettingComponent]
})
export class ReservationModule { }
