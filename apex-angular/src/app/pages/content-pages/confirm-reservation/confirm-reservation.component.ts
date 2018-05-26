import { Component, OnInit } from '@angular/core';
import { ConfirmReservationService } from './confirm-reservation.service';
@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss']
})
export class ConfirmReservationComponent implements OnInit {

  reservationCorrect:Boolean = false;  
  reservationAnnulerByClient:Boolean = false; 
  reservationAnnulerByAdmin:Boolean = false;
  reservationAnnulerEnAttente:Boolean = false; 
  reservationInvalide:Boolean = true; 
  reservationDetails =[]; 
  constructor(private confirmReservationService: ConfirmReservationService) { }

  ngOnInit() {
        var url = window.location.href;
       
        if(url.includes("=")) {
             console.log(url.split("=")[1]);
                this.confirmReservationService.getReservation(url.split("=")[1]).subscribe(data => {
                    if(data != null) {
                         console.dir(data)
                        data.timeFrom = data.timeFrom.replace("-", ":");
                        data.timeTo = data.timeTo.replace("-", ":");
                         this.reservationDetails = data;
                        
                        if(data.status == "CONFIRMED") {
                             if(data.adminCanceled == true) {
                                this.reservationInvalide= false; 
                                this.reservationAnnulerByAdmin = true; 
                                 
                             }else if(data.clientCanceled == true) {
                                this.reservationInvalide= false; 
                                this.reservationAnnulerByClient = true; 
                                 
                             }else{
                                this.reservationCorrect= true;
                                this.reservationInvalide= false;
                             
                             }
                        }else if(data.status == "ANNULER"){
                            
                             if(data.adminCanceled == true) {
                                this.reservationInvalide= false; 
                                this.reservationAnnulerByAdmin = true; 
                                 
                             }else if(data.clientCanceled == true) {
                                this.reservationInvalide= false; 
                                this.reservationAnnulerByClient = true; 
                                 
                             }
                        }else{
                            this.reservationInvalide= false; 
                            this.reservationAnnulerEnAttente = true; 
                        }    
                       
                      
                         
                    }
            });
        }
        
  }

}
