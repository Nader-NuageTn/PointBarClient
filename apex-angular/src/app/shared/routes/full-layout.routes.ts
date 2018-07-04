import { Routes, RouterModule } from '@angular/router';
import { SecuriteGuardService } from '../auth/securite-guard.service';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
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
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];