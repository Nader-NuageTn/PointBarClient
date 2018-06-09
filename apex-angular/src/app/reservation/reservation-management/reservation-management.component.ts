import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ReservationManagementService } from './reservation-management.service';

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

  constructor(private reservationManagementService: ReservationManagementService) { 
        this.source = new LocalDataSource(tableData.data); // create the source
        this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
        //this.alertSource = new LocalDataSource(tableData.data); // create the source
      this.getReservationsEnAttente(); 
      }

  ngOnInit() {
      //delete this.reservationsettings.columns.status;
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
        if (window.confirm('Are you sure you want to Cancel this reservation?')) {
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
       }else if(event.data.status == '<span class="badge badge-info">Arriv&#233;e</span>') {
            this.reservationManagementService.reservConfirmedStatus();
       }if(event.data.status == ' <span class="badge badge-danger">Annul&#233;e</span>') {
           this.reservationManagementService.reservAnnulerStatus();
       }
    }
    //  Confirm Reservation
    onCustom(event) {
        this.loadSpinner = true;
        console.log(event);
        console.log(this.source);
        console.log(event.data)
        if(event.data.status == ' <span class="badge badge-warning">En Attente</span>' || event.data.status == ' <span class="badge badge-danger">Annul&#233;e</span>') {
            if (window.confirm('Are you sure you want to Confirm this reservation?')) {
            
            this.reservationManagementService.confirmerReservation(event.data.id).subscribe(data => {
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
       }else if(event.data.status == '<span class="badge badge-info">Arriv&#233;e</span>') {
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
    //  Edit Tranche horaire
    onSaveConfirm(event) {
        console.log(event.newData.timeFrom);
        if(event.newData.timeFrom[0] != null && event.newData.timeFrom[1] != null && event.newData.timeFrom[2] && event.newData.timeFrom[3] != null) {
        if (window.confirm('Are you sure you want to save?')) {
            this.trancheHorFrom['hour']=event.newData.timeFrom[0];
            this.trancheHorFrom['minute']=event.newData.timeFrom[1];
            this.trancheHorTo['hour']=event.newData.timeFrom[2];
            this.trancheHorTo['minute']=event.newData.timeFrom[3];
            console.log(event.newData.timeFrom);
            console.log(event.newData);
            if(this.isArray(event.newData.timeFrom)) {
                event.newData.timeFrom = event.newData.timeFrom[0]+":"+event.newData.timeFrom[1]+"-"+event.newData.timeFrom[2]+":"+event.newData.timeFrom[3];
            }else {
                event.newData.timeFrom = event.newData.timeFrom.split("-")[0].split(":")[0]+":"+event.newData.timeFrom.split("-")[0].split(":")[1]+"-"+event.newData.timeFrom.split("-")[1].split(":")[0]+":"+event.newData.timeFrom.split("-")[1].split(":")[1];
            }
            
            this.reservationManagementService.editTrancheHoraire(event.newData.id,event.newData.timeFrom).subscribe(data => {
               console.log(data); 
                if(data == "success") {
                    this.reservationManagementService.typeSuccess();
                }
            });
            event.confirm.resolve(event.newData);
            }
        } else {
            event.confirm.reject();
            this.reservationManagementService.TrancheHorNotif();
        }
    }
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
