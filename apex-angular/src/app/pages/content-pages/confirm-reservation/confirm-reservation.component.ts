import { Component, OnInit } from '@angular/core';
import { ConfirmReservationService } from './confirm-reservation.service';
@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss']
})
export class ConfirmReservationComponent implements OnInit {

  reservationCorrect:Boolean = false;  
  reservationConfirmed:Boolean = false; 
    
  reservationAnnulerByClient:Boolean = false; 
  reservationAnnulerByAdmin:Boolean = false;
  reservationAnnulerEnAttente:Boolean = false; 
  reservationUsed:Boolean = false; 
  reservationInvalide:Boolean = true; 
  reservationDetails =[]; 
  nbPersonne:number=0;
  reservationID:number;
    
  constructor(private confirmReservationService: ConfirmReservationService) { }

  ngOnInit() {
        var url = window.location.href;
       
        if(url.includes("=")) {
             console.log(url.split("=")[1]);
                this.confirmReservationService.getReservation(url.split("=")[1]).subscribe(data => {
                    if(data != null) {
                         console.dir(data)
                        this.reservationID = data.id;
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
                        }else if(data.status == "ARRIVE"){
                            
                            this.reservationInvalide= false; 
                            this.reservationUsed = true; 
                            
                        }else{
                            this.reservationInvalide= false; 
                            this.reservationAnnulerEnAttente = true; 
                        }    
                       
                      
                         
                    }
            });
        }
        
  }
    confirm(){
          this.confirmReservationService.confirmReservation(this.reservationID,this.nbPersonne).subscribe(data => {
              
              if(data="success"){
                  this.reservationCorrect= false;
                  this.reservationConfirmed=true;
              }
              console.log(data)
          });
    }
}
