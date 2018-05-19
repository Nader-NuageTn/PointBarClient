import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PbusersRoutingModule } from "./pbusers-routing.module";

import { PbusersComponent } from "./pbusers.component";
import { PbusersService } from "./pbusers.service";

@NgModule({
    imports: [
        CommonModule,
        Ng2SmartTableModule,
        PbusersRoutingModule
    ],
    declarations: [
        PbusersComponent
    ],
    providers: [PbusersService]
})
export class PbusersModule { }
