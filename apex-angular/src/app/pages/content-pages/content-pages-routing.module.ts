import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { ClientReservationComponent } from "./client-reservation/client-reservation.component";
import { ConfirmReservationComponent } from "./confirm-reservation/confirm-reservation.component";
import { LoginSecuriteComponent } from "./login-securite/login-securite.component";
import { SecuriteGuardService } from '../../shared/auth/securite-guard.service';
import { ClientVipComponent } from "./client-vip/client-vip.component";
import { ManagerGuardService } from '../../shared/auth/manager-guard.service';
import { ConfirmVIPGuardService } from '../../shared/auth/confirm-vip-gard.service';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'comingsoon',
                component: ComingSoonPageComponent,
                data: {
                    title: 'Coming Soon page'
                }
            },
            {
                path: 'error',
                component: ErrorPageComponent,
                data: {
                    title: 'Error Page'
                }
            },
            {
                path: 'forgotpassword',
                component: ForgotPasswordPageComponent,
                data: {
                    title: 'Forgot Password Page'
                }
            },

            {
                path: 'lockscreen',
                component: LockScreenPageComponent,
                data: {
                    title: 'Lock Screen page'
                }
            },
            {
                path: 'login',
                component: LoginPageComponent,
                data: {
                    title: 'Login Page'
                }
            },
            {
                path: 'maintenance',
                component: MaintenancePageComponent,
                data: {
                    title: 'Maintenance Page'
                }
            },
            {
                path: 'register',
                component: RegisterPageComponent,
                data: {
                    title: 'Register Page'
                }
            }, {
                path: 'reservation',
                component: ClientReservationComponent,
                data: {
                    title: 'Reservation'
                }

            }, {
                path: 'confirmation/:id',
                component: ConfirmReservationComponent,
                data: {
                    title: 'confirmation'
                },
                canActivate: [SecuriteGuardService]

            },
            {
                path: 'loginSuccess/:fullName',
                component: LoginSecuriteComponent,
                data: {
                    title: 'Login Success'
                },
                canActivate: [SecuriteGuardService]

            }, {
                path: 'newclient/:id',
                component: ClientVipComponent,
                data: {
                    title: 'Client VIP'
                },
                canActivate: [ConfirmVIPGuardService]

            }


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
