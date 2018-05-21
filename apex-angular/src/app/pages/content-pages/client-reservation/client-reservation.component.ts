import { Component, OnInit, ViewChild  } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { ClientReservationService } from './client-reservation.service';
import { NewReservationModel } from './NewReservationModel.model';

const now = new Date();
const I18N_VALUES = {
    fr: {
        weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
        months: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    },
};

// Range datepicker Start 
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;
// Range datepicker Ends


@Component({
    selector: 'client-reservation',
    templateUrl: './client-reservation.component.html',
    styleUrls: ['./client-reservation.component.css']
})
export class ClientReservationComponent implements OnInit {


     // Variable declaration
    reservation:NewReservationModel;
    d3: any;
    model: NgbDateStruct;
    popupModel;
    date: { year: number, month: number };
    displayMonths = 2;
    navigation = 'select';
    disabledModel: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    disabled = true;
    customModel: NgbDateStruct;
    configModal;    // Global configuration of datepickers

    // Range datepicker start
    hoveredDate: NgbDateStruct;
    
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
 
    meridian = true;
    time: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
    meridianTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
    validationTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
    validationTimeTo: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
    spinners = false;



    // Using for Meridian
    toggleMeridian() {
        this.meridian = !this.meridian;
    }


    // Custom Day View Starts
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    // Custom Day View Ends  
    constructor(private clientReservationService: ClientReservationService) { 
    
    
    }

    ngOnInit() {
        
        this.reservation = new NewReservationModel("", "","", "", "",now, "", "", 0, 0);
    } 
    onSubmit() {
        this.clientReservationService.addSuccess();
        this.reservation = new NewReservationModel("", "","", "", "",now, "", "", 0, 0);
    } 
}
