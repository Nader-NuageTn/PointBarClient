import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
  editX:{
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  },
  view: {
    confirmSave: true,
    viewButtonContent: '<i class="ft-check-2 info font-medium-1 mr-2"></i>'
  },
};

var data = [
  {
    id: 1,
    name: 'Leanne Graham',
  },
  {
    id: 2,
    name: 'Ervin Howell',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
  },
  {
    id: 11,
    name: 'Nicholas DuBuque',
  }
]

@Component({
    selector: 'reservation-setting',
    templateUrl: './reservation-setting.component.html',
    styleUrls: ['./reservation-setting.component.scss']
})
export class ReservationSettingComponent implements OnInit {

    newEvent = false;
    acc: any;
    source: LocalDataSource;
    settings = settings;
    ngOnInit() {
        // Customizer JS File
        $.getScript('./assets/js/customizer.js');
    }

    constructor() {
        this.source = new LocalDataSource(data); // create the source
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
}
