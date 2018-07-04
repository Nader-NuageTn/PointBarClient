import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DashboardComponent } from "./statistic/dashboard.component";
import { DashboardService } from './statistic/dashboard.service';



@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgxChartsModule,
        Ng2SmartTableModule
    ],
    exports: [],
    declarations: [
        DashboardComponent
    ],
    providers: [DashboardService],
})
export class DashboardModule { }
