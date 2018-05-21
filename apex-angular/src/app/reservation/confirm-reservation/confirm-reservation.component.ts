import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ConfirmReservationComponent implements OnInit {
        
  source: LocalDataSource;
  filterSource: LocalDataSource;
  alertSource: any;
    
  constructor() { 
        this.source = new LocalDataSource(tableData.data); // create the source
        this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
        //this.alertSource = this.pbusersService.getpbUsers(); // create the source
      }
    

  ngOnInit() {
  }
    
  settings = tableData.settings;
    filtersettings = tableData.filtersettings;
    alertsettings = tableData.alertsettings;


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
    
    onCustom(event) {
        console.log(event.data.id);
//        this.pbusersService.activateUser(event.newData.id).subscribe(data => {
//               console.log(data);
//               if(data == "success") {
//                    this.pbusersService.activateSuccess();
//                }
//            });
        
    }

}
