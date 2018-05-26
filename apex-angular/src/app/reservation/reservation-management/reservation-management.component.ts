import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ReservationManagementService } from './reservation-management.service';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ReservationManagementComponent implements OnInit {
        
  source: LocalDataSource;
  filterSource: LocalDataSource;
  alertSource: any;

  constructor(private reservationManagementService: ReservationManagementService) { 
        this.source = new LocalDataSource(tableData.data); // create the source
        this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
        this.alertSource = new LocalDataSource(tableData.data); // create the source
//        this.reservationManagementService.getAllReservation().subscribe(data => {
//             console.log(data);
//             this.alertSource =data;
//            });  
      }

  ngOnInit() {
      delete this.reservationsettings.columns.id;
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
            let indexReservation = this.alertSource.data.indexOf(event.data);
        console.log(indexReservation);
        this.source =new LocalDataSource(this.alertSource.data.splice(indexReservation, 1));
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
//    onSaveConfirm(event) {
//        if (window.confirm('Are you sure you want to save?')) {
//            event.newData['name'] += ' + added in code';
//            event.confirm.resolve(event.newData);
//            console.log(event.newData);
//            this.reservationManagementService.editTrancheHoraire(event.newData.trancheHoraire).subscribe(data => {
//               console.log(data); 
//                if(data == "success") {
//                    this.reservationManagementService.typeSuccess();
//                }
//            });
//        } else {
//            event.confirm.reject();
//        }
//    }

}
