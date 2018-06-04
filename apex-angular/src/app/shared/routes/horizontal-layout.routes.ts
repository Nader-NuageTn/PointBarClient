import { Routes, RouterModule } from '@angular/router';

//Route for content layout with top menu and footer.

export const HORIZONTAL_ROUTES: Routes = [
  {
    path: 'users',
    loadChildren: './pbusers/pbusers.module#PbusersModule'
  },
  {
    path: 'reservations',
    loadChildren: './reservation/reservation.module#ReservationModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  }
];