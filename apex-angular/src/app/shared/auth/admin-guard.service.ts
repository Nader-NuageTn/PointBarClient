import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuardService implements CanActivate{

  constructor(private authService: AuthService, public router: Router) { }
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (!this.authService.getIsAdmin()) {
      this.router.navigate(['pages/login']);
      return false;
    }
    return true;
  }

}
