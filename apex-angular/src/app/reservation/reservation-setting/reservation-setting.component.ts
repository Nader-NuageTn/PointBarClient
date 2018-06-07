import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ReservationSettingService } from './reservation-setting.service';
import { NewEvenModel } from './newEventModel.model';


var settings = {
    noDataMessage: 'No Events',
    pager: {
        display: true,
        perPage: 5,
    },
    columns: {
        idevent: {
            title: 'id',
            filter: true,
        },
        title: {
            title: 'Title',
            filter: true,
        },
        date: {
            title: 'Date',
            filter: true,
        },
        description: {
            title: 'Description',
            filter: true,
        }
    },
    attr: {
        class: "table table-responsive"
    },
    add: {
        confirmCreate: false,
        addButtonContent: "",
    },
    edit: {
        editButtonContent: ''
    },
    delete: {
        confirmDelete: true,
        deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
    },
    view: {
        confirmSave: true,
        viewButtonContent: '<i class="ft-check-2 info font-medium-1 mr-2"></i>'
    },
    actions: {
        custom: [
            { name: 'Edit', title: `<i class="ft-edit-2 info font-medium-1 mr-2"></i>` }
        ],
    }
}

var settings1 = {

    noDataMessage: 'No Closed Dates',
    pager: {
        display: true,
        perPage: 5,
    },
    columns: {
        id: {
            title: 'id',
            filter: false,
        }, date: {
            title: 'Date',
            filter: true,
        }
    },
    attr: {
        class: "table table-responsive"
    },
    add: {
        confirmCreate: false,
        addButtonContent: "",
    },
    edit: {
        editButtonContent: ''
    },
    delete: {
        deleteButtonContent: ''
    },
    view: {
        confirmSave: true,
        viewButtonContent: '<i class="ft-check-2 info font-medium-1 mr-2"></i>'
    },
    actions: {
        custom: [
            { name: 'Activate', title: `<i class="ft-toggle-left success font-medium-1 mr-1"></i>` }
        ],

    }
};


const now = new Date();
const I18N_VALUES = {
    fr: {
        weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
        months: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    },
};


@Component({
    selector: 'ngbd-modal-content',
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Erreur</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>La taille de l'image ne doit pas d\u00e9passer 10 Mo!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-raised" (click)="activeModal.close('Close click')">Ok</button>
    </div>
  `
})

export class NgbdModalContentSetting {

    constructor(public activeModal: NgbActiveModal) { }
}


@Component({
    selector: 'reservation-setting',
    templateUrl: './reservation-setting.component.html',
    styleUrls: ['./reservation-setting.component.scss']
})
export class ReservationSettingComponent implements OnInit {

    newEvent = false;
    editEvent = false;
    acc: any;

    source1: LocalDataSource;
    settings1 = settings1;

    source: LocalDataSource;
    settings = settings;
    closedDates = [];
    allEvents = [];
    event: NewEvenModel;
    ReservationParams = [];
    ngOnInit() {

        var today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.event = new NewEvenModel("", this.disabledModel, "");

        this.reservationSettingService.getAllCloseReservationDate(today).subscribe(data => {
            this.closedDates = data;
            this.source1 = new LocalDataSource(this.closedDates);
        });
        this.reservationSettingService.getAllEvents(today).subscribe(data => {
            this.allEvents = data;
            this.source = new LocalDataSource(this.allEvents);
        });

        this.reservationSettingService.getReservationParams().subscribe(data => {
            this.ReservationParams = data;
            console.log(this.ReservationParams);
        });
        // Customizer JS File
        $.getScript('./assets/js/customizer.js');
    }


    d3: any;

    date: { year: number, month: number };
    disabledModel: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    customModel: NgbDateStruct;
    configModal;    // Global configuration of datepickers

    // Range datepicker start
    hoveredDate: NgbDateStruct;
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;

    fileUp2: any;
    FileName: string = "Envoyer..";
    
    constructor(private reservationSettingService: ReservationSettingService, private modalService: NgbModal) {
        this.source = new LocalDataSource(this.allEvents); // create the source
        this.source1 = new LocalDataSource(this.closedDates); // create the source
        delete this.settings.columns.idevent;
        delete this.settings.columns.description;
        delete this.settings1.columns.id;

    }

    // Prevent panel toggle code
    public beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === '2') {
            $event.preventDefault();
        }
        if ($event.panelId === '3' && $event.nextState === false) {
            $event.preventDefault();
        }
    };

    colseReservation(closedDate) {
        if (closedDate == null) {
            this.reservationSettingService.requiredDateError();
        } else {
            this.reservationSettingService.closeReservationDate(closedDate).subscribe(data => {
                if (data == "exist") {
                    this.reservationSettingService.dateClosed();
                } else if (data == "fail") {
                    this.reservationSettingService.reservationFail();

                } else {
                    this.reservationSettingService.closeDateSuccess();
                    var Dday = { id: data, date: closedDate.month + '-' + closedDate.day + '-' + closedDate.year }
                    this.closedDates.push(Dday);
                    this.source1 = new LocalDataSource(this.closedDates);
                }
            });

        }
    }

    onCustom(event) {

        const index: number = this.closedDates.indexOf(event.data);
        console.log(index);
        if (index !== -1) {
            this.reservationSettingService.activateReservationDate(event.data.id).subscribe(data => {
                if (data == "success") {
                    this.reservationSettingService.dateActivated();
                    this.closedDates.splice(index, 1);
                    this.source1 = new LocalDataSource(this.closedDates);
                } else {
                    this.reservationSettingService.reservationFail();
                }
            });


        }

    }

    createNewEvent() {
        this.reservationSettingService.createNewEvent(this.event).subscribe(data => {
            if (data != null) {
                if (this.fileUp2 != null) {
                    console.log(this.fileUp2.name);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const formData = new FormData();
                        const imgBlob = new Blob([reader.result], { type: this.fileUp2.type });
                        formData.append('file', imgBlob, this.fileUp2.name);
                        formData.append('eventiD', data.idevent);
                        formData.append('fileName', this.fileUp2.name);
                        this.reservationSettingService.postData(formData).subscribe(data1 => {
                            setTimeout(() => {
                                this.allEvents.push(data);
                                this.source = new LocalDataSource(this.allEvents);
                                this.newEvent = false;
                                this.fileUp2 = null;
                                this.FileName = "Envoyer..";
                                this.event = new NewEvenModel("", this.disabledModel, "");
                            }, 1000);
                        });
                    };
                    reader.readAsArrayBuffer(this.fileUp2);
                } else {
                    this.allEvents.push(data);
                    this.source = new LocalDataSource(this.allEvents);
                    this.newEvent = false;
                }


            } else {
                this.reservationSettingService.reservationFail();
            }
        });
    }

    editThisEvent() {
        var today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.reservationSettingService.editEvent(this.event).subscribe(data => {
            if (data != null) {
                if (this.fileUp2 != null) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const formData = new FormData();
                        const imgBlob = new Blob([reader.result], { type: this.fileUp2.type });
                        formData.append('file', imgBlob, this.fileUp2.name);
                        formData.append('eventiD', data.idevent);
                        formData.append('fileName', this.fileUp2.name);
                        this.reservationSettingService.postData(formData).subscribe(data1 => {
                            setTimeout(() => {
                                this.reservationSettingService.getAllEvents(today).subscribe(data => {
                                    this.allEvents = data;
                                    this.source = new LocalDataSource(this.allEvents);
                                    this.editEvent = false;
                                    this.fileUp2 = null;
                                    this.FileName = "Envoyer..";
                                    this.event = new NewEvenModel("", this.disabledModel, "");
                                });
                            }, 1000);
                        });
                    };
                    reader.readAsArrayBuffer(this.fileUp2);

                } else {

                    this.reservationSettingService.getAllEvents(today).subscribe(data => {
                        this.allEvents = data;
                        this.source = new LocalDataSource(this.allEvents);
                        this.editEvent = false;
                    });



                }
            } else {
                this.reservationSettingService.reservationFail();
            }
        });
    }
    onCancelEdit(event) {
        if (this.editEvent == true) {
            event.date = this.event.date.month + "-" + this.event.date.day + "-" + this.event.date.year;
        }
        this.newEvent = false;
        this.editEvent = false;
    }
    onEdit(event) {
        this.event = event.data;
        this.event.date = { day: +event.data.date.split("-")[1], month: +event.data.date.split("-")[0], year: +event.data.date.split("-")[2] };
        console.dir(this.event);
        this.editEvent = true;
    }


    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            if (file && file.size > 10000000) {
                const modalRef = this.modalService.open(NgbdModalContentSetting);
            } else {
                reader.readAsDataURL(file);
                this.fileUp2 = file;
                this.FileName = file.name;
            }


        }
    }

    onDelete(event) {
        const index: number = this.allEvents.indexOf(event.data);
        console.log(index);
        if (index !== -1) {
            this.reservationSettingService.deleteEvent(event.data.idevent).subscribe(data => {
                if (data == "succes") {
                    //this.reservationSettingService.eventCanceled();
                    this.allEvents.splice(index, 1);
                    this.source = new LocalDataSource(this.allEvents);
                } else {
                    this.reservationSettingService.reservationFail();
                }
            });


        }
    }
    
    updeservationParams() {
    console.dir(this.ReservationParams);
        this.reservationSettingService.updateReservationParams( this.ReservationParams).subscribe(data => {
                        if (data == "success") {
                            this.reservationSettingService.updateReservationParamsDone();
                                  } else {
                this.reservationSettingService.reservationFail();
            }
            });
}
    }    
