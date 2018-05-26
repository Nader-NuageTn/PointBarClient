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
  constructor() {
      super();
  }
    
  ngAfterViewInit() {
    if (this.cell.newValue !== '') {
      this.reservation.timeFrom = this.cell.newValue;
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
