import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as tableData from '../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ClientVipService } from "./client-vip.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-client-vip',
  templateUrl: './client-vip.component.html',
  styleUrls: ['./client-vip.component.scss']
})


export class ClientVipComponent implements OnInit {
        
    source: LocalDataSource;
    filterSource: LocalDataSource;
    settings = tableData.settings;
    filtersettings = tableData.filtersettings;
    alertsettings = {
        add: {
            confirmCreate: false,
            addButtonContent: "",
        }
    }
    disactivatedClients:boolean =false;
    
  constructor(private clientVipService: ClientVipService,private router: Router,
        private route: ActivatedRoute) {
        this.filterSource = new LocalDataSource(tableData.filerdata); // create the source
        this.alertsettings = tableData.clientVIPsettings;
         this.clientVipService.getActivatedClients().subscribe(data => {
             console.log(data);
             this.source =data;
            }); // create the source
       }

  ngOnInit() {
     
  }
    
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
        
    }
    
    //  For confirm action On Delete
    onDeleteConfirm(event) {
        console.log(event);
        if (window.confirm('\xCAtes-vous s\xFBr que vous voulez supprimer ce client?')) {
            event.confirm.resolve(event.data);
            console.log(event.data);
            this.clientVipService.deleteClient(event.data.id).subscribe(data => {
               console.log(data); 
                if(data == "Done") {
                    this.clientVipService.deleteSuccess();
                }
            });
        }
      

    }

    //  For confirm action On Save
    onSaveConfirm(event) {
        if (window.confirm('\xCAtes-vous s\xFBr de vouloir sauvegarder?')) {
            
            console.log(event.newData);
            this.clientVipService.editClient(event.newData).subscribe(data => {
               console.log(data); 
                if(data == "Done") {
                    this.clientVipService.editSuccess();
                    event.confirm.resolve(event.newData);
                }else{
                    //this.clientVipService.emailExistNotif();
                }
            });
        } else {
            event.confirm.reject();
        }
    }
    
    onCustom(event) {
      
        console.log(event);
            if(event.action == "Activate") {
                if (window.confirm("\xCAtes-vous s\xFBr de vouloir activer cet utilisateur? Ne pas oublier de v\u00e9rifier le r\xF4le.")) {
                    this.clientVipService.activateClient(event.data.id).subscribe(data => {
                       console.log(data);
                       if(data == "Done") {
                           this.clientVipService.activateSuccess();
                           this.getDisactivatedClients();
                      }
                   });
               }
            }else if(event.action == "Desactivate"){
                if (window.confirm("\xCAtes-vous s\xFBr de vouloir d\u00e9sactiver cet utilisateur?")) {
                    this.clientVipService.disactivateClient(event.data.id).subscribe(data => {
                       console.log(data);
                       if(data == "Done") {
                            this.clientVipService.deactivateSuccess();
                            this.clientVipService.getActivatedClients().subscribe(data => {        
                            this.disactivatedClients=false;
                            this.alertsettings = tableData.clientVIPsettings;
                            this.source =data;
                        });
                      }
                   });
               }
            }
       
        
    }
    getDisactivatedClients() {
        this.clientVipService.getDisactivatedClients().subscribe(data => {
            this.disactivatedClients=true;
            this.alertsettings = tableData.deletedClientsettings;
            this.source =data;
        }); 
    }
    
    getActivatedClients() {
        this.clientVipService.getActivatedClients().subscribe(data => {
            this.disactivatedClients=false;
            this.alertsettings = tableData.clientVIPsettings;
            this.source =data;
        }); 
    }

}

