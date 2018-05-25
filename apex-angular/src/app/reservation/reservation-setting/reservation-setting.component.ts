import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar, NgbTimeStruct, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
var settings = {
  columns: {
    id: {
      title: 'Date',
      filter: true,
    },
    name: {
      title: 'Title',
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
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  },
  view: {
    confirmSave: true,
    viewButtonContent: '<i class="ft-check-2 info font-medium-1 mr-2"></i>'
  },

}


var data = [
  {
    id: '07-05-2018',
    name: 'Event 4',
  },
  {
    id: '06-25-2018',
    name: 'Event 3',
  },
  {
    id: '06-10-2018',
    name: 'Event 2',
  },
  {
    id: '05-29-2018',
    name: 'Event 1',
  }
]
var settings1 = {
  columns: {
    Date: {
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

var data1 = [
  {
    Date: '5-26-2018',
  },
  {
    Date: '5-28-2018',
  }
]
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
    ngOnInit() {
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

    constructor() {
        this.source = new LocalDataSource(data); // create the source
       this.source1 = new LocalDataSource(data1); // create the source
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
        console.dir(closedDate);
        var Dday ={Date: closedDate.month+'-'+closedDate.day+'-'+closedDate.year}
        data1.push(Dday);
         this.source1 = new LocalDataSource(data1);
    }
    
    onCustom(event) {
        console.log(event.data.Date);
        const index: number = data1.indexOf({Date: event.data.Date});
        console.log(index);
        if (index !== -1) {
            data1.splice(index, 1);
            this.source1 = new LocalDataSource(data1);
        }  
        
        
    }
}
