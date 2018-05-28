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

  constructor(private reservationManagementService: ReservationManagementService) { 
        this.source = new LocalDataSource(tableData.data); // create the source
        this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
        //this.alertSource = new LocalDataSource(tableData.data); // create the source
      let today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.reservationManagementService.getAllWaitingReservation(today).subscribe(data => {
             console.log(data);
            for(let x of data) {
                x.timeFrom= x.timeFrom.hour+":"+x.timeFrom.minute+"-"+x.timeTo.hour+":"+x.timeTo.minute;
                }
             this.alertSource =data;
            });  
      }

  ngOnInit() {
      delete this.reservationsettings.columns.id;
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
            this.reservationManagementService.annulerReservation(event.data.id+"").subscribe(data => {
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
          const index = event.source.data.indexOf(event.data);
        console.log(index);
        if (index !== -1) {
            event.source.data.splice(index, 1);
            this.source = new LocalDataSource(event.source.data);
            }
        this.reservationManagementService.confirmerReservation(event.data.id).subscribe(data => {
               console.log(data);
               if(data == "success") {
                   
                    this.reservationManagementService.activateSuccess();
                    
                }
            });
            
        }else {
            event.confirm.reject();
        }
    }
    
    //  Edit Tranche horaire
    onSaveConfirm(event) {
        if(event.newData.timeFrom[0] != null && event.newData.timeFrom[1] != null && event.newData.timeFrom[2] && event.newData.timeFrom[3] != null) {
        if (window.confirm('Are you sure you want to save?')) {
            this.trancheHorFrom['hour']=event.newData.timeFrom[0];
            this.trancheHorFrom['minute']=event.newData.timeFrom[1];
            this.trancheHorTo['hour']=event.newData.timeFrom[2];
            this.trancheHorTo['minute']=event.newData.timeFrom[3];
            console.log(event.newData);
            event.newData.timeFrom = event.newData.timeFrom[0]+":"+event.newData.timeFrom[1]+"-"+event.newData.timeFrom[2]+":"+event.newData.timeFrom[3];
            this.reservationManagementService.editTrancheHoraire(event.newData.id,this.trancheHorFrom,this.trancheHorTo).subscribe(data => {
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
    
    
    getAllReservations(){
        let today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.reservationManagementService.getAllReservation(today).subscribe(data => {
             console.log(data);
            for(let x of data) {
                x.timeFrom= x.timeFrom.hour+":"+x.timeFrom.minute+"-"+x.timeTo.hour+":"+x.timeTo.minute;
                }
             this.reservationsettings = tableData.reservationsettings;
             this.alertSource =data;
             
        });  
    }
}
