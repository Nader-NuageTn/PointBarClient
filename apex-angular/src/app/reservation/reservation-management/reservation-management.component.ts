import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ReservationManagementService } from './reservation-management.service';
import { AuthService } from '../../shared/auth/auth.service';

const now = new Date();
@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReservationManagementComponent implements OnInit {
        
  source: LocalDataSource;
  filterSource: LocalDataSource;
  alertSource: any;
    
  trancheHorFrom:any = {};
  trancheHorTo:any = {};
    
  allReservations:boolean = false;
  loadSpinner:boolean = false;
  userAuthID:any;
    
  constructor(private reservationManagementService: ReservationManagementService, private auth: AuthService) { 
        this.source = new LocalDataSource(tableData.data); // create the source
        this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
        //this.alertSource = new LocalDataSource(tableData.data); // create the source
      this.getReservationsEnAttente(); 
      }

  ngOnInit() {
      this.userAuthID =  this.auth.getUserAuthID()
  }
    settings = tableData.settings;
    filtersettings = tableData.filtersettings;
    alertsettings = tableData.alertsettings;
    reservationsettings = tableData.reservationsettings;


    // And the listener code which asks the DataSource to filter the data:
    onSearch(query: string = '') {
        this.source.setFilter([
            // fields we want to inclue in the search
            {
                field: 'id',
                search: query,
            },
            {
                field: 'name',
                search: query,
            },
            {
                field: 'username',
                search: query,
            },
            {
                field: 'email',
                search: query,
            },
        ], false);
        // second parameter specifying whether to perform 'AND' or 'OR' search 
        // (meaning all columns should contain search query or at least one)
        // 'AND' by default, so changing to 'OR' by setting false here
    }
    
    //  For Cancel Reservation
    onDeleteConfirm(event) {
        console.log(event);
        if(event.data.status == ' <span class="badge badge-warning">En Attente</span>' || event.data.status == ' <span class="badge badge-success">Confirm&#233;e</span>') {
        if (window.confirm('\xCAtes-vous s\xFBr de vouloir annuler cette r\u00e9servation?')) {
            console.log(this.allReservations);
            this.reservationManagementService.annulerReservation(event.data.id).subscribe(data => {
               console.log(data); 
                if(data == "success" || data == "fail sms") {
                    this.reservationManagementService.deleteSuccess();
                    if(this.allReservations == false) {
                       event.confirm.resolve(); 
                    }else {
                        this.getAllReservations();
                    }
                }
            });
        } else {
            event.confirm.reject();
        }
       }else if(event.data.status == ' <span class="badge badge-info">Arriv&#233;e</span>') {
            this.reservationManagementService.reservConfirmedStatus();
       }if(event.data.status == ' <span class="badge badge-danger">Annul&#233;e</span>') {
           this.reservationManagementService.reservAnnulerStatus();
       }
    }
    //  Confirm Reservation
    onCustom(event) {
        
        console.log(event);
        console.log(this.source);
        console.log(event.data)
        if(event.data.status == ' <span class="badge badge-warning">En Attente</span>' || event.data.status == ' <span class="badge badge-danger">Annul&#233;e</span>') {
            this.loadSpinner = true;
            if (window.confirm('\xCAtes-vous s\xFBr de vouloir confirmer cette r\u00e9servation?')) {
            
            this.reservationManagementService.confirmerReservation(event.data.id,this.userAuthID).subscribe(data => {
                   console.log(data);
                   if(data == "success") {
                       if(this.allReservations == true){
                           this.getAllReservations()
                       }else this.getReservationsEnAttente(); 
                       
                       this.reservationManagementService.activateSuccess();
                       this.loadSpinner=false;
                        
                    }else if(data == "problem linkQrCode") {
                      if(this.allReservations == true){
                           this.getAllReservations()
                       }else this.getReservationsEnAttente(); 
                       this.reservationManagementService.problemQRCode();
                       this.loadSpinner=false;
                        
                    }else if(data == "fail sms") {
                       if(this.allReservations == true){
                           this.getAllReservations()
                       }else this.getReservationsEnAttente(); 
                       this.reservationManagementService.problemSms();
                       this.loadSpinner=false;
                        
                    }else if(data == "problem sending email") {
                       if(this.allReservations == true){
                           this.getAllReservations()
                       }else this.getReservationsEnAttente(); 
                       this.reservationManagementService.problemEmail();
                       this.loadSpinner=false;
                        
                    }else if(data == "fail") {
               
                       this.reservationManagementService.activateFail();
                       this.loadSpinner=false;
                        
                    }
                });
                
            }else {
               this.loadSpinner=false;
            }
       }else if(event.data.status == ' <span class="badge badge-info">Arriv&#233;e</span>') {
            this.loadSpinner=false;
            this.reservationManagementService.reservConfirmedStatus();
       }else if(event.data.status == ' <span class="badge badge-success">Confirm&#233;e</span>') {
            this.loadSpinner=false;
           this.reservationManagementService.reservreconfirm();
       }
    }
    isArray(a) {
    return (!!a) && (a.constructor === Array);
};

    getReservationsEnAttente(){
        this.allReservations = false;
        let today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.reservationManagementService.getAllWaitingReservation(today).subscribe(data => {
             console.log(data);
             this.alertSource =data;
            }); 
    }
    
    getAllReservations(){
        this.allReservations = true;
        let today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.reservationManagementService.getAllReservation(today).subscribe(data => {
             console.log(data);
             this.reservationsettings = tableData.reservationsettings;
             this.alertSource =data;
             
        });  
    }
}
