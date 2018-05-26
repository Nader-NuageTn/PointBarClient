import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ReservationComponent implements OnInit {
        
  constructor() {
  }

  ngOnInit() {
  }
}
