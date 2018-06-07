import { Component, OnInit } from '@angular/core';
import { ConfirmReservationService } from './confirm-reservation.service';
@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
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
  nbPersonneHomme:number=0;
  nbPersonneFemme:number=0;
  reservationID:number;
    
  isScan: boolean = false;
    
  constructor(private confirmReservationService: ConfirmReservationService) { }

  ngOnInit() {
        var url = window.location.href;
       
        if(url.includes("/")) {
             console.log(url.split("/").pop());
                this.confirmReservationService.getReservation(url.split("/").pop()).subscribe(data => {
                    if(data != null) {
                         console.dir(data)
                        localStorage.setItem('isScan', 'true');
                        localStorage.setItem('idRes', url.split("/").pop());
                         if (data != null && data.clientsEntity.hasPhoto == true) {
                        this.confirmReservationService.getProfilePicture(data.clientsEntity.photoPath).subscribe(data1 => {
                            console.log(data1);
                            var blob = new Blob([data1.blob()], { type: data1._body.type });
                            let url = URL.createObjectURL(blob);

                            let reader = new FileReader();
                            reader.addEventListener("load", () => {
                                let iframeContent = reader.result;
                                let _iFrame;
                                if (data1._body.type == "application/pdf") {
                                    _iFrame = document.createElement('embed');
                                } else {
                                    _iFrame = document.createElement('img');
                                }
                                
                                _iFrame.src = url;
                                 _iFrame.setAttribute('style', 'max-width:190px;max-height:190px');
                                $('#userProfile').append(_iFrame);
                            });
                            reader.readAsDataURL(blob)

                        });

                    }
                        
                        this.reservationID = data.id;
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
          this.confirmReservationService.confirmReservation(this.reservationID,this.nbPersonneHomme,this.nbPersonneFemme).subscribe(data => {
              
              if(data="success"){
                  this.reservationCorrect= false;
                  this.reservationConfirmed=true;
              }
              console.log(data)
          });
    }
    
    reservationQtyMenPlus() {
        this.nbPersonneHomme = this.nbPersonneHomme + 1;
    }
    reservationQtyMenMinus() {
        console.log(this.nbPersonneHomme);
        if(this.nbPersonneHomme > 0 ){
            this.nbPersonneHomme = this.nbPersonneHomme - 1;
        }
        
    }
    reservationQtyWomenPlus() {
        this.nbPersonneFemme = this.nbPersonneFemme + 1;
    }
    reservationQtyWomenMinus() {
         if(this.nbPersonneFemme >0 ){
             this.nbPersonneFemme = this.nbPersonneFemme - 1;
         }
        
    }
}
