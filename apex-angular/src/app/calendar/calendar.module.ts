import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { CalendarRoutingModule } from "./calendar-routing.module";

import { NouisliderModule } from 'ng2-nouislider/src/nouislider';
import { CalendarsComponent } from "./calendar.component";
import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
    imports: [
        CommonModule,
        CalendarRoutingModule,
        CalendarModule.forRoot(),
        NgbModalModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        FormsModule,
        NouisliderModule
    ],
    declarations: [
        CalendarsComponent,
        DateTimePickerComponent
    ]
})
export class CalendarsModule { }
