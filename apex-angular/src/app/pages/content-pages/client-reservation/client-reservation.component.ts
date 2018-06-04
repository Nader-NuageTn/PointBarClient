import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, NgbActiveModal, NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { ClientReservationService } from './client-reservation.service';
import { NewReservationModel } from './NewReservationModel.model';
import { AuthService } from '../../../shared/auth/auth.service';
declare var $: any;
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
      <h4 class="modal-title">Erreur!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{reason}}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-raised" (click)="activeModal.close('Close click')">Ok</button>
    </div>
  `
})

export class NgbdModalContentTimeInvalide {
    @Input() name;
    reason:string;
    constructor(public activeModal: NgbActiveModal) { }
}

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
    reservation: NewReservationModel;
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


    minwidth: string;
    maxheight: string;

    mobHeight: any;
    mobWidth: any;


    displayEvent: boolean = false;
    eventExist: boolean = false;
    smallScreen: boolean = true;

    eventTitle: string;
    eventDate: string;
    eventDescription: string;
    eventImage: boolean;
    // Custom Day View Starts
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }
    isAuthantified: string;
    isAdmin: string
    // Custom Day View Ends  

    constructor(private clientReservationService: ClientReservationService, private modalService: NgbModal, private auth: AuthService) {

        this.mobWidth = (window.innerWidth) + "px";
        this.isAuthantified = this.auth.getToken();
        this.isAdmin = this.auth.getIsAdmin();

        if ((window.innerWidth) >= 1500) {
            this.displayEvent = true;
            this.minwidth = "800px";
            this.maxheight = "400px";
        } else if ((window.innerWidth) >= 1200) {
            this.displayEvent = true;
            this.minwidth = (window.innerWidth) - 800 + "px";
            this.maxheight = (window.innerWidth) - 1000 + "px";
        } else if ((window.innerWidth) >= 1100) {
            this.displayEvent = true;
            this.minwidth = (window.innerWidth) - 700 + "px";
            this.maxheight = (window.innerWidth) - 700 + "px";
        } else this.displayEvent = false;


    }

    onResize(event) {

        this.mobWidth = (window.innerWidth) + "px";

        if ((window.innerWidth) >= 1500) {
            if (this.displayEvent == false) {
                var today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

                this.clientReservationService.getNextEvent(today).subscribe(data => {
                    console.dir(data);
                    if (data != null && data.hasPhoto == true) {
                        this.clientReservationService.getEventPicture(data.pathPhoto).subscribe(data1 => {
                            console.log(data1);
                            var blob = new Blob([data1.blob()], { type: data1._body.type });
                            let url = URL.createObjectURL(blob);

                            let reader = new FileReader();
                            reader.addEventListener("load", () => {
                                let iframeContent = reader.result;
                                let _iFrame;
                                if (data1._body.type == "application/pdf") {
                                    _iFrame = document.createElement('embed');
                                } else {
                                    _iFrame = document.createElement('img');
                                }
                                //_iFrame.src = window.URL.createObjectURL(xhr.response);
                                _iFrame.src = url;
                                $('#eventGrid').append(_iFrame);
                            });
                            reader.readAsDataURL(blob)

                        });

                    }

                    if (data != null) {
                        this.eventTitle = data.title;
                        this.eventDate = data.date;
                        this.eventDescription = data.description;
                        this.eventImage = data.hasPhoto;
                        console.log(this.eventImage);
                        this.eventExist = true;

                    }
                });
            }
            this.displayEvent = true;
            this.minwidth = "800px";
            this.maxheight = "400px";
        } else if ((window.innerWidth) >= 1200) {
            if (this.displayEvent == false) {
                var today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

                this.clientReservationService.getNextEvent(today).subscribe(data => {
                    console.dir(data);
                    if (data != null && data.hasPhoto == true) {
                        this.clientReservationService.getEventPicture(data.pathPhoto).subscribe(data1 => {
                            console.log(data1);
                            var blob = new Blob([data1.blob()], { type: data1._body.type });
                            let url = URL.createObjectURL(blob);

                            let reader = new FileReader();
                            reader.addEventListener("load", () => {
                                let iframeContent = reader.result;
                                let _iFrame;
                                if (data1._body.type == "application/pdf") {
                                    _iFrame = document.createElement('embed');
                                } else {
                                    _iFrame = document.createElement('img');
                                }
                                //_iFrame.src = window.URL.createObjectURL(xhr.response);
                                _iFrame.src = url;
                                $('#eventGrid').append(_iFrame);
                            });
                            reader.readAsDataURL(blob)

                        });

                    }
                    if (data != null) {
                        this.eventTitle = data.title;
                        this.eventDate = data.date;
                        this.eventDescription = data.description;
                        this.eventImage = data.hasPhoto;
                        console.log(this.eventImage);
                        this.eventExist = true;
                    }
                });
            }
            this.displayEvent = true;
            this.minwidth = (window.innerWidth) - 800 + "px";
            this.maxheight = (window.innerWidth) - 1000 + "px";
        } else if ((window.innerWidth) >= 1100) {
            if (this.displayEvent == false) {
                var today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

                this.clientReservationService.getNextEvent(today).subscribe(data => {
                    console.dir(data);
                    if (data != null && data.hasPhoto == true) {
                        this.clientReservationService.getEventPicture(data.pathPhoto).subscribe(data1 => {
                            console.log(data1);
                            var blob = new Blob([data1.blob()], { type: data1._body.type });
                            let url = URL.createObjectURL(blob);

                            let reader = new FileReader();
                            reader.addEventListener("load", () => {
                                let iframeContent = reader.result;
                                let _iFrame;
                                if (data1._body.type == "application/pdf") {
                                    _iFrame = document.createElement('embed');
                                } else {
                                    _iFrame = document.createElement('img');
                                }
                                //_iFrame.src = window.URL.createObjectURL(xhr.response);
                                _iFrame.src = url;
                                $('#eventGrid').append(_iFrame);
                            });
                            reader.readAsDataURL(blob)

                        });


                    }
                    if (data != null) {
                        this.eventTitle = data.title;
                        this.eventDate = data.date;
                        this.eventDescription = data.description;
                        this.eventImage = data.hasPhoto;
                        console.log(this.eventImage);
                        this.eventExist = true;
                    }
                });
            }
            this.displayEvent = true;
            this.minwidth = (window.innerWidth) - 700 + "px";
            this.maxheight = (window.innerWidth) - 700 + "px";
        } else this.displayEvent = false;

    }
    ngOnInit() {
        console.log(now);
        this.reservation = new NewReservationModel("", "", "", "", "", this.disabledModel, "", "", 0, 0);

        this.regularForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'phone': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'textArea': new FormControl(null, [Validators.required]),
            'facebook': new FormControl(null, [Validators.required]),
            'dp': new FormControl(null, [Validators.pattern("[0-9]{0-10}")])
        }, { updateOn: 'blur' });

        var today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

        this.clientReservationService.getNextEvent(today).subscribe(data => {
            console.dir(data);
            if (data != null && data.hasPhoto == true) {
                this.clientReservationService.getEventPicture(data.pathPhoto).subscribe(data1 => {
                    console.log(data1);
                    var blob = new Blob([data1.blob()], { type: data1._body.type });
                    let url = URL.createObjectURL(blob);

                    let reader = new FileReader();
                    reader.addEventListener("load", () => {
                        let iframeContent = reader.result;
                        let _iFrame;
                        if (data1._body.type == "application/pdf") {
                            _iFrame = document.createElement('embed');
                        } else {
                            _iFrame = document.createElement('img');
                        }
                        //_iFrame.src = window.URL.createObjectURL(xhr.response);
                        _iFrame.src = url;
                        $('#eventGrid').append(_iFrame);
                    });
                    reader.readAsDataURL(blob)

                });

            }
            if (data != null) {
                this.eventTitle = data.title;
                this.eventDate = data.date;
                this.eventDescription = data.description;
                this.eventImage = data.hasPhoto;
                console.log(this.eventImage);
                this.eventExist = true;
            }

        });

    }
    onSubmit() {

        
        if (this.reservation.firstName == null || this.reservation.lastName == null || this.reservation.email == null || this.reservation.phone == null
            || this.reservation.date == null || this.reservation.timeFrom == null || this.reservation.timeTo == null || this.reservation.qtyMen == null || this.reservation.qtyMen == null
            || this.reservation.firstName == "" || this.reservation.lastName == "" || this.reservation.email == "" || this.reservation.phone == "" || this.reservation.timeFrom == "" || this.reservation.timeTo == "") {
            this.clientReservationService.requiredFieldError();

        } else if (this.reservation.timeFrom.hour > this.reservation.timeTo.hour || (this.reservation.timeFrom.hour == this.reservation.timeTo.hour && this.reservation.timeFrom.minute >= this.reservation.timeTo.minute)) {
            const modalRef = this.modalService.open(NgbdModalContentTimeInvalide);
            modalRef.componentInstance.reason = "Tranche horaire invalide";

        } else if (this.reservation.date == this.disabledModel && this.reservation.timeFrom.hour < now.getHours() + 2) {
            const modalRef = this.modalService.open(NgbdModalContentTimeInvalide);
            modalRef.componentInstance.reason = "Votre r\u00e9servation doit \u00eatre au minimum 2 heure \u00e0 l'avance";

        } else if (this.reservation.date == this.disabledModel && this.reservation.timeFrom.hour == now.getHours() + 2 && this.reservation.timeFrom.minute <= now.getMinutes()) {
            const modalRef = this.modalService.open(NgbdModalContentTimeInvalide);
            modalRef.componentInstance.reason = "Votre r\u00e9servation doit \u00eatre au minimum 2 heure \u00e0 l'avance";

        } else if (this.reservation.qtyMen == 0 && this.reservation.qtyMen == 0) {
            this.clientReservationService.requiredNumberOfPersonError();


        } else {
            this.clientReservationService.sendReservationRequest(this.reservation).subscribe(data => {

                if (data == "fail") {
                    this.clientReservationService.reservationFail();

                } else if (data == "closed") {
                    const modalRef = this.modalService.open(NgbdModalContent);
                    modalRef.componentInstance.date = this.reservation.date.month + "-" + this.reservation.date.day + "-" + this.reservation.date.year;

                } else {

                    if (this.fileUp2 != null) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const formData = new FormData();
                            const imgBlob = new Blob([reader.result], { type: this.fileUp2.type });
                            formData.append('file', imgBlob, this.fileUp2.name);
                            formData.append('useriD', data);
                            formData.append('fileName', this.fileUp2.name);
                            this.clientReservationService.postData(formData).subscribe(data => {
                                setTimeout(() => {
                                    this.clientReservationService.reservationSuccess();
                                    this.reservation = new NewReservationModel("", "", "", "", "", this.disabledModel, "", "", 0, 0);
                                }, 1000);
                            });
                        };
                        reader.readAsArrayBuffer(this.fileUp2);
                    } else {
                        this.clientReservationService.reservationSuccess();
                        this.reservation = new NewReservationModel("", "", "", "", "", this.disabledModel, "", "", 0, 0);
                    }


                }
            });

        }

    }

    open(content) {
        this.modalService.open(content).result.then((result) => {

            this.clientReservationService.cancelReservation(result).subscribe(data => {
                if (data == "success") {
                    this.clientReservationService.cancelSuccess();
                } else if (data == "no exist") {
                    this.clientReservationService.cancelFail();
                } else {
                    this.clientReservationService.reservationFail();
                }
            });

        }, (reason) => { });

    }
    fileUp2: any;
    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            this.fileUp2 = file;
        }
    }

    reservationQtyMenPlus() {
        this.reservation.qtyMen = this.reservation.qtyMen + 1;
    }
    reservationQtyMenMinus() {
        this.reservation.qtyMen = this.reservation.qtyMen - 1;
    }
    reservationQtyWomenPlus() {
        this.reservation.qtyWomen = this.reservation.qtyWomen + 1;
    }
    reservationQtyWomenMinus() {
        this.reservation.qtyWomen = this.reservation.qtyWomen - 1;
    }

}
