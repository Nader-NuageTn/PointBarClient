import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ClientvipRoutingModule } from './clientvip-routing.module';
import { ClientVipComponent } from './client-vip.component';
import { ClientVipService } from './client-vip.service';
@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ClientvipRoutingModule
  ],
  declarations: [
     ClientVipComponent
  ],
  providers: [ClientVipService]
})
export class ClientvipModule { }
