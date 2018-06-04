import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    {
        path: '/users', title: 'Utilisateurs', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Reservations', icon: 'ft-calendar', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/reservations/ReservationManagement', title: 'Reservations', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/reservations/ReservationSetteing', title: 'Evenements', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }
];
