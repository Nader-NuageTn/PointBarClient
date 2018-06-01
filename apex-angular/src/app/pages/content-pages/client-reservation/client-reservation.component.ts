import { Component, OnInit, ViewChild ,  Input } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, NgbActiveModal, NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { ClientReservationService } from './client-reservation.service';
import { NewReservationModel } from './NewReservationModel.model';
import { AuthService } from '../../../shared/auth/auth.service';

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
    selector: 'ngbd-modal-content',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">D\u00e9sol\u00e9</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Les nombres des places sont complets pendant tout la date {{date}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-raised" (click)="activeModal.close('Close click')">Ok</button>
    </div>
  `
})

export class NgbdModalContent {
    @Input() name;
    date;
    constructor(public activeModal: NgbActiveModal) { }
}

@Component({
    selector: 'client-reservation',
    templateUrl: './client-reservation.component.html',
    styleUrls: ['./client-reservation.component.css']
})
export class ClientReservationComponent implements OnInit {

    @ViewChild('vform') validationForm: FormGroup;
    regularForm: FormGroup;
    @ViewChild('f') registerForm: NgForm;
    
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
    customDay;
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

    closeResult: string;
    reservationID: number;
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
    constructor(private clientReservationService: ClientReservationService,private modalService: NgbModal, private auth: AuthService) { 
    console.log(this.auth.getToken());
        console.log(this.auth.isAdmin);
    
    
    }

    ngOnInit() {
        console.log(now);
        this.reservation = new NewReservationModel("", "","", "", "",this.disabledModel, "", "", 0, 0);
        
          this.regularForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'phone': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'textArea': new FormControl(null, [Validators.required]),
            'facebook': new FormControl(null, [Validators.required]),
            'dp': new FormControl(null, [Validators.pattern("[0-9]{0-10}")])
        }, {updateOn: 'blur'});
    } 
    onSubmit() {
       console.log(this.reservation.timeFrom);
        if(this.reservation.firstName == null || this.reservation.lastName == null || this.reservation.email == null || this.reservation.phone == null 
        || this.reservation.date == null || this.reservation.timeFrom == null || this.reservation.timeTo == null || this.reservation.qtyMen == null || this.reservation.qtyMen == null
        || this.reservation.firstName == "" || this.reservation.lastName == "" || this.reservation.email == "" || this.reservation.phone == "" || this.reservation.timeFrom == "" || this.reservation.timeTo == "") {
            this.clientReservationService.requiredFieldError();
        }else if(this.reservation.qtyMen == 0 && this.reservation.qtyMen == 0) {
            this.clientReservationService.requiredNumberOfPersonError();
        }else{
            this.clientReservationService.sendReservationRequest(this.reservation).subscribe(data => {
                if(data == "success") {
                    this.clientReservationService.reservationSuccess();
                    this.reservation = new NewReservationModel("", "","", "", "",this.disabledModel, "", "", 0, 0);
                }else if(data == "closed") {
                    const modalRef = this.modalService.open(NgbdModalContent);
                    modalRef.componentInstance.date = this.reservation.date.month+"-"+this.reservation.date.day+"-"+this.reservation.date.year;

                }else {
                    this.clientReservationService.reservationFail();
                }
            });

        }

    } 

    open(content) {
        this.modalService.open(content).result.then((result) => {

             this.clientReservationService.cancelReservation(result).subscribe(data => {
                if(data == "success") {
                    this.clientReservationService.cancelSuccess();
                }else if(data == "no exist") {
                    this.clientReservationService.cancelFail();
                }else {
                    this.clientReservationService.reservationFail();
                }
            });

        }, (reason) => {});

    }
    reservationQtyMenPlus(){
        this.reservation.qtyMen = this.reservation.qtyMen +1;
    }
    reservationQtyMenMinus(){
        this.reservation.qtyMen = this.reservation.qtyMen -1;
    }
     reservationQtyWomenPlus(){
        this.reservation.qtyWomen = this.reservation.qtyWomen +1;
    }
    reservationQtyWomenMinus(){
        this.reservation.qtyWomen = this.reservation.qtyWomen -1;
    }

}
