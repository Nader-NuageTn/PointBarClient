import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
  add:{
   confirmCreate: false,
   addButtonContent: "",
  },
  edit:{
    editButtonContent: ''
  },
  delete:{
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
    },date: {
      title: 'Date',
      filter: true,
    }
  },
  attr: {
    class: "table table-responsive"
  },
  add:{
   confirmCreate: false,
   addButtonContent: "",
  },
  edit:{
    editButtonContent: ''
  },
  delete:{
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
    selector: 'reservation-setting',
    templateUrl: './reservation-setting.component.html',
    styleUrls: ['./reservation-setting.component.scss']
})
export class ReservationSettingComponent implements OnInit {

    newEvent = false;
    acc: any;
   
   source1: LocalDataSource;
   settings1 = settings1;
   
    source: LocalDataSource;
    settings = settings;
    closedDates = [];
    allEvents = [];
    event:NewEvenModel;
    ngOnInit() {
    
        var today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.event = new NewEvenModel("",this.disabledModel, "");
        
        this.reservationSettingService.getAllCloseReservationDate(today).subscribe(data => {
            this.closedDates= data;
            this.source1 = new LocalDataSource( this.closedDates);
        });
        this.reservationSettingService.getAllEvents(today).subscribe(data => {
            this.allEvents= data;
            this.source = new LocalDataSource( this.allEvents);
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

    constructor(private reservationSettingService: ReservationSettingService) {
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
    
    colseReservation(closedDate){
         if(closedDate == null) {
            this.reservationSettingService.requiredDateError();
        }else{
            this.reservationSettingService.closeReservationDate(closedDate).subscribe(data => {
                if(data == "success") {
                    this.reservationSettingService.closeDateSuccess();
                     var Dday ={date: closedDate.month+'-'+closedDate.day+'-'+closedDate.year}
                     this.closedDates.push(Dday);
                     this.source1 = new LocalDataSource(this.closedDates);
                }else if(data == "exist") {
                    this.reservationSettingService.dateClosed();
                }else {
                    this.reservationSettingService.reservationFail();
                }
            });

        }
    }
    
    onCustom(event) {
        console.log(event.data);
        console.log( this.closedDates);
        const index: number =  this.closedDates.indexOf(event.data);
        console.log(index);
        if (index !== -1) {
            this.reservationSettingService.activateReservationDate(event.data.id).subscribe(data => {
                if(data == "success") {
                    this.reservationSettingService.dateActivated();
                    this.closedDates.splice(index, 1);
                    this.source1 = new LocalDataSource( this.closedDates);
                }else {
                    this.reservationSettingService.reservationFail();
                }
            });
            
            
        }  
        
    }

    createNewEvent() {
        this.reservationSettingService.createNewEvent(this.event).subscribe(data => {
                if(data != null) {
                     this.allEvents.push(data);
                     this.source = new LocalDataSource(this.allEvents);
                     this.newEvent = false;
               
                }else {
                    this.reservationSettingService.reservationFail();
                }
            });      
    }
    
    onEdit() {
        this.newEvent = true;
    }
}
