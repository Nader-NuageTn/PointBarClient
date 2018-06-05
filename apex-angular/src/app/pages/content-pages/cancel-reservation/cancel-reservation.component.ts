import { Component, OnInit } from '@angular/core';
import { CancelReservationService } from './cancel-reservation.service';
@Component({
  selector: 'app-cancel-reservation',
  templateUrl: './cancel-reservation.component.html',
  styleUrls: ['./cancel-reservation.component.scss']
})
export class CancelReservationComponent implements OnInit {

    reservationInvalide:boolean=false;
    reservationAnnuler:boolean=false;
    
  constructor(private cancelReservationService: CancelReservationService) { }

  ngOnInit() {
       var url = window.location.href;
       
        if(url.includes("/")) {
             console.log(url.split("/").pop());
                this.cancelReservationService.cancelReservation(url.split("/").pop()).subscribe(data => {
                    
                    console.log(data);
                    if(data == "success"){
                        this.reservationAnnuler =true;
                    }else{
                        this.reservationInvalide =true;
                    }
                });
            
        
        }
  }

}
