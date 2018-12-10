import { RouteInfo } from './sidebar.metadata';
import { SecuriteGuardService } from '../../shared/auth/securite-guard.service';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: '/dashboard/dashboard1', title: 'Analytic Dashboard', icon: 'ft-bar-chart-2', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },{
        path: '/users', title: 'Utilisateurs', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },{
        path: '/clients', title: 'Clients VIP', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Reservations', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/reservations/ReservationManagement', title: 'Reservations', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reservations/ReservationSetteing', title: 'Evenements', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },{
        path: '/Calendar', title: 'Calendrier', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }
];
