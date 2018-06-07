import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ReservationManagementService } from './reservation-management.service';

const now = new Date();
@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ReservationManagementComponent implements OnInit {
        
  source: LocalDataSource;
  filterSource: LocalDataSource;
  alertSource: any;
    
  trancheHorFrom:any = {};
  trancheHorTo:any = {};
    
  allReservations:boolean = false;

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
        if (window.confirm('Are you sure you want to Cancel this reservation?')) {
            event.confirm.resolve();
            this.reservationManagementService.annulerReservation(event.data.id).subscribe(data => {
               console.log(data); 
                if(data == "success") {
                    this.reservationManagementService.deleteSuccess();
                }
            });
        } else {
            event.confirm.reject();
        }
    }
    //  Confirm Reservation
    onCustom(event) {
        console.log(event);
        console.log(this.source);
        
        if (window.confirm('Are you sure you want to Confirm this reservation?')) {
        
        this.reservationManagementService.confirmerReservation(event.data.id).subscribe(data => {
               console.log(data);
               if(data == "success") {
                   this.getReservationsEnAttente(); 
                   this.reservationManagementService.activateSuccess();
                    
                }
            });
            
        }else {
            event.confirm.reject();
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
