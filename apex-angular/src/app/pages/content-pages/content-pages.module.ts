import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomFormsModule } from 'ng2-validation';

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
import { ReservationSettingComponent, NgbdModalContentSetting } from './reservation-setting/reservation-setting.component';
import { ClientReservationComponent, NgbdModalContent,NgbdModalContentTimeInvalide,NgbdModalContentImageSetting  } from './client-reservation/client-reservation.component';
import { ClientReservationService } from './client-reservation/client-reservation.service';
import { ReservationSettingService } from './reservation-setting/reservation-setting.service';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';

import { LoginSecuriteComponent } from './login-securite/login-securite.component';
import { CancelReservationComponent } from './cancel-reservation/cancel-reservation.component';
import { CancelReservationService } from './cancel-reservation/cancel-reservation.service';


@NgModule({
    exports: [
        NgbModule,
    ],
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        HttpModule,
        NgbModule,  
        Ng2SmartTableModule,
        CustomFormsModule,
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
        ReservationSettingComponent,
        NgbdModalContent,
        NgbdModalContentSetting,
        NgbdModalContentTimeInvalide,
        NgbdModalContentImageSetting ,
        ConfirmReservationComponent,
        LoginSecuriteComponent,
        CancelReservationComponent,
    ],
    providers: [SignupServiceService, LoginService, ClientReservationService,ReservationSettingService,CancelReservationService],
    entryComponents: [NgbdModalContent,NgbdModalContentSetting,NgbdModalContentTimeInvalide,NgbdModalContentImageSetting ]
})
export class ContentPagesModule { }
