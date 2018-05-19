import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'reservation-setting',
  templateUrl: './reservation-setting.component.html',
  styleUrls: ['./reservation-setting.component.scss']
})
export class ReservationSettingComponent implements OnInit {
    
   newEvent=false; 
    acc: any;
  constructor() { }

  ngOnInit() {
    // Customizer JS File
    $.getScript('./assets/js/customizer.js');
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
