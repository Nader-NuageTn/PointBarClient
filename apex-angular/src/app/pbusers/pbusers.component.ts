import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';

import { PbusersService } from "./pbusers.service";
import { Router, ActivatedRoute } from "@angular/router";

declare var $: any;
@Component({
  selector: 'app-pbusers',
  templateUrl: './pbusers.component.html',
  styleUrls: ['./pbusers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PbusersComponent implements OnInit {
        
    source: LocalDataSource;
    filterSource: LocalDataSource;
    alertSource: any;
    
deletedUsers:boolean =false;
    
  constructor(private pbusersService: PbusersService,private router: Router,
        private route: ActivatedRoute) {
        this.source = new LocalDataSource(tableData.data); // create the source
        this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
      
         this.pbusersService.getpbUsers().subscribe(data => {
             console.log(data);
             for(let user of data) {
                 user.role= user.role.description;
              }
             
             this.alertSource =data;
            }); // create the source
       }

  ngOnInit() {
      this.deletedUsers = false;
      this.pbusersService.getpbUsers().subscribe(data => {
             console.log(data);
             for(let user of data) {
                 user.role= user.role.description;
              }
             
             this.alertSource =data;
          this.alertsettings = tableData.alertsettings;
            }); // create the source
  }
    
    settings = tableData.settings;
    filtersettings = tableData.filtersettings;
    alertsettings:any;


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
    
    //  For confirm action On Delete
    onDeleteConfirm(event) {
        console.log(event);
        if(event.data.isDeleted == false) {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve(event.data);
            console.log(event.data);
            this.pbusersService.deleteUser(event.data.id).subscribe(data => {
               console.log(data); 
                if(data == "success") {
                    this.pbusersService.deleteSuccess();
                }
            });
        } else {
            event.confirm.reject();
        }
      }else {
           if (window.confirm('Are you sure you want to Activate the user?')) {
               event.confirm.resolve(event.data);
            this.pbusersService.activateDeletedUser(event.data.id).subscribe(data => {
               console.log(data);
               if(data == "succes") {
                    this.pbusersService.activateSuccess();
                }
            });
           }else {
            event.confirm.reject();
        }
            
      }
    }

    //  For confirm action On Save
    onSaveConfirm(event) {
        if (window.confirm('Are you sure you want to save?')) {
            event.newData['name'] += ' + added in code';
            event.confirm.resolve(event.newData);
            console.log(event.newData);
            this.pbusersService.editUser(event.newData).subscribe(data => {
               console.log(data); 
                if(data == "success") {
                    this.pbusersService.typeSuccess();
                }
            });
        } else {
            event.confirm.reject();
        }
    }
    
    onCustom(event) {
        console.log(event);
            if(event.data.isConfirmed == false) {
            this.pbusersService.activateUser(event.data.id).subscribe(data => {
               console.log(data);
               if(data == "succes") {
                    this.pbusersService.activateSuccess();
                   this.pbusersService.getpbUsers().subscribe(data => {
             console.log(data);
            for(let user of data) {
                 user.role= user.role.description;
              }
            this.deletedUsers=false;
             this.alertsettings = tableData.alertsettings;
             this.alertSource =data;
        });
                }
            });
            }else {
            this.pbusersService.activateWarning();
            }
        
    }
    getDeletedUsers() {
        this.pbusersService.getdeletedUsers().subscribe(data => {
             console.log(data);
            for(let user of data) {
                 user.role= user.role.description;
              }
            this.deletedUsers=true;
             this.alertsettings = tableData.deletedUsersettings;
             this.alertSource =data;
        }); 
    }
    
    getActivedUsers() {
        this.pbusersService.getpbUsers().subscribe(data => {
             console.log(data);
            for(let user of data) {
                 user.role= user.role.description;
              }
            this.deletedUsers=false;
             this.alertsettings = tableData.alertsettings;
             this.alertSource =data;
        }); 
    }

}
