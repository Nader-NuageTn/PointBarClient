import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { SignupServiceService } from "./register/signup-service.service";
import { LoginService } from "./login/login.service";
import { HttpModule } from '@angular/http';
import { ReservationSettingComponent } from './reservation-setting/reservation-setting.component';
import { ClientReservationComponent } from './client-reservation/client-reservation.component';
import { ClientReservationService } from './client-reservation/client-reservation.service';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        HttpModule,
        NgbModule,  
        Ng2SmartTableModule,
        CustomFormsModule     
    ],
    declarations: [
        ComingSoonPageComponent,
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        RegisterPageComponent,
        ClientReservationComponent,
        ReservationSettingComponent
    ],
    providers: [SignupServiceService, LoginService, ClientReservationService]
})
export class ContentPagesModule { }
