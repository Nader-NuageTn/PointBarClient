import { Component, OnInit, ElementRef, Input } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  selector: 'app-do-bcomponent',
  templateUrl: './do-bcomponent.component.html',
  styleUrls: ['./do-bcomponent.component.scss']
})
export class DoBcomponentComponent  extends DefaultEditor implements OnInit {
  
  reservation:any = {};
  tab:any =[];
  tab2:any=[];
  timeFrom = {};
  timeTo = {};
  constructor() {
      super();
  }
    
  ngAfterViewInit() {
      console.log(this.cell.newValue);
      this.timeFrom['hour'] =this.cell.newValue.split("-")[0].split(":")[0];
      this.timeFrom['minute'] =this.cell.newValue.split("-")[0].split(":")[1];
      this.timeFrom['second'] ="0";
      
      this.timeTo['hour'] =this.cell.newValue.split("-")[1].split(":")[0];
      this.timeTo['minute'] =this.cell.newValue.split("-")[1].split(":")[1];
      this.timeTo['second'] ="0";
    if (this.cell.newValue !== '') {
      this.reservation.timeFrom = this.timeFrom;
      this.reservation.timeTo = this.timeTo;
    }
  }

  ngOnInit() {
  }
    
  updateValue(){
      if(this.reservation.timeFrom != null) {
      this.tab[0]=this.reservation.timeFrom.hour;
      this.tab[1]=this.reservation.timeFrom.minute;
      }
  }
  updateValue2() {
      if(this.reservation.timeTo != null) {
          this.tab2[0]=this.reservation.timeTo.hour;
          this.tab2[1]=this.reservation.timeTo.minute;
          }
      console.log(this.reservation.timeTo);
      this.cell.newValue=this.tab.concat(this.tab2);
 }

}
