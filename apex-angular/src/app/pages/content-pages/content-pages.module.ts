import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomFormsModule } from 'ng2-validation';
import { NouisliderModule } from 'ng2-nouislider/src/nouislider';

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
import { ClientReservationComponent, NgbdModalContent,NgbdModalContentTimeInvalide,NgbdModalContentImageSetting,NgbdModalTrackStatus  } from './client-reservation/client-reservation.component';
import { ClientReservationService } from './client-reservation/client-reservation.service';
import { ReservationSettingService } from './reservation-setting/reservation-setting.service';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';

import { LoginSecuriteComponent } from './login-securite/login-securite.component';
import { NumberOnlyDirective } from './client-reservation/number-only.directive';
import { ClientVipComponent ,NgbdModalImageSetting} from './client-vip/client-vip.component';
import { ClientVipService } from './client-vip/client-vip.service';

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
        NouisliderModule
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
        NgbdModalTrackStatus,
        LoginSecuriteComponent,
        NumberOnlyDirective,
        ClientVipComponent,
        NgbdModalImageSetting
    ],
    providers: [SignupServiceService, LoginService, ClientReservationService,ReservationSettingService,ClientVipService],
    entryComponents: [NgbdModalContent,NgbdModalContentSetting,NgbdModalContentTimeInvalide,NgbdModalContentImageSetting,NgbdModalTrackStatus ]
})
export class ContentPagesModule { }
